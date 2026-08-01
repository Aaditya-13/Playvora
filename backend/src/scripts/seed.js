import mongoose from "mongoose";
import { faker } from "@faker-js/faker";
import connectDB from "../db/index.js";
import User from "../models/User.model.js";
import Activity from "../models/Activity.model.js";
import Attendance from "../models/Attendance.model.js";
import JoinRequest from "../models/JoinRequest.model.js";
import { SPORTS, SKILL_LEVELS, VENUE_TYPES, JOIN_POLICIES, GENDER_PREFERENCES } from "../constants/activity.constants.js";

const mode = process.argv[2] || "prototype"; // clear, test, prototype

const NASHIK_LAT = 20.0059;
const NASHIK_LNG = 73.7799;

const NASHIK_GROUNDS = [
  "Nashik Turf",
  "KickOff Turf",
  "Bhosala Military School Ground",
  "Godavari Riverfront Ground",
  "Mahatma Nagar Ground",
  "Golf Club Ground",
  "City Sports Arena",
];

const SPORT_PREFIXES = ["Dummy", "Weekend", "Evening", "Morning", "Friendly", "Competitive"];
const SPORT_SUFFIXES = ["Match", "Game", "Scrimmage", "Tournament", "Practice", "Meetup"];

async function clearDB() {
  console.log("Clearing database...");
  await User.deleteMany({});
  await Activity.deleteMany({});
  await Attendance.deleteMany({});
  await JoinRequest.deleteMany({});
  console.log("Database cleared.");
}

async function seedUsers(count) {
  console.log(`Seeding ${count} users...`);
  const users = [];
  for (let i = 0; i < count; i++) {
    const isGuest = faker.datatype.boolean({ probability: 0.1 });
    // First user is the k6 test user
    if (i === 0) {
      users.push({
        username: "k6testuser",
        fullName: "K6 Test User",
        email: "test@example.com",
        avatar: { url: "", publicId: "" },
        bio: "Test user for k6",
        isVerified: true,
        isGuest: false,
        authProvider: "local",
        favouriteSports: ["football"],
      });
      continue;
    }

    users.push({
      username: faker.internet.username().toLowerCase().replace(/[^a-z0-9]/g, "") + faker.string.numeric(4),
      fullName: faker.person.fullName(),
      email: faker.internet.email().toLowerCase(),
      avatar: { url: faker.image.avatar(), publicId: "" },
      bio: faker.lorem.sentence(),
      isVerified: true,
      isGuest,
      authProvider: isGuest ? "guest" : "local",
      favouriteSports: faker.helpers.arrayElements(SPORTS, { min: 1, max: 3 }),
    });
  }
  
  // Dummy bcrypt hash for "password123" to save time on hashing thousands of users
  const dummyHash = "$2b$10$dClUP1HJpXPFfM.O49FtK..eXIFAIFt.JLjg4U.Kd4AsKoy/nC6mK"; 
  users.forEach(u => u.password = dummyHash);

  const inserted = await User.collection.insertMany(users);
  console.log(`Seeded ${inserted.insertedCount} users.`);
  // Fetch them back via mongoose to get full mongoose documents (with _id mapping)
  const userDocs = await User.find();
  return userDocs;
}

async function seedActivities(count, users, dayRange) {
  console.log(`Seeding ${count} activities...`);
  const activities = [];
  
  for (let i = 0; i < count; i++) {
    const sport = faker.helpers.arrayElement(SPORTS);
    const organizer = faker.helpers.arrayElement(users);
    
    const maxPlayers = faker.number.int({ min: 5, max: 22 });
    const currentPlayersCount = faker.number.int({ min: 1, max: maxPlayers });
    const participants = faker.helpers.arrayElements(users, currentPlayersCount);
    
    // Ensure organizer is in participants
    if (!participants.find(p => p._id.toString() === organizer._id.toString())) {
      participants[0] = organizer;
    }

    const scheduledAt = faker.date.soon({ days: dayRange });
    
    // Coordinate randomization (approx 0.05 deg is roughly 5km)
    const lat = NASHIK_LAT + faker.number.float({ min: -0.05, max: 0.05, fractionDigits: 5 });
    const lng = NASHIK_LNG + faker.number.float({ min: -0.05, max: 0.05, fractionDigits: 5 });

    const prefix = faker.helpers.arrayElement(SPORT_PREFIXES);
    const suffix = faker.helpers.arrayElement(SPORT_SUFFIXES);
    const groundName = faker.helpers.arrayElement(NASHIK_GROUNDS);

    activities.push({
      title: `${prefix} ${sport.charAt(0).toUpperCase() + sport.slice(1)} ${suffix}`,
      description: faker.lorem.paragraph(),
      sport,
      organizer: organizer._id,
      participants: participants.map(p => p._id),
      groundName,
      address: `${faker.location.streetAddress()}, Nashik, Maharashtra`,
      location: {
        type: "Point",
        coordinates: [lng, lat],
      },
      scheduledAt,
      maxPlayers,
      currentPlayers: participants.length,
      skillLevel: faker.helpers.arrayElement(SKILL_LEVELS),
      venueType: faker.helpers.arrayElement(VENUE_TYPES),
      joinPolicy: faker.helpers.arrayElement(JOIN_POLICIES),
      genderPreference: faker.helpers.arrayElement(GENDER_PREFERENCES),
      cost: {
        amount: faker.number.int({ min: 0, max: 500 }),
        currency: "INR",
        description: "Per person",
      },
      visibilityRadius: 5000,
      status: "open",
    });
  }

  const CHUNK_SIZE = 1000;
  for (let i = 0; i < activities.length; i += CHUNK_SIZE) {
    await Activity.insertMany(activities.slice(i, i + CHUNK_SIZE));
    console.log(`Inserted chunk of ${Math.min(CHUNK_SIZE, activities.length - i)} activities.`);
  }

  console.log(`Seeded ${count} activities.`);
}

async function run() {
  await connectDB();
  
  if (mode === "clear") {
    await clearDB();
  } else if (mode === "test") {
    await clearDB();
    const users = await seedUsers(1500);
    await seedActivities(4500, users, 3);
  } else if (mode === "prototype") {
    await clearDB();
    const users = await seedUsers(120);
    await seedActivities(200, users, 90);
  } else {
    console.log("Invalid mode.");
  }
  
  mongoose.connection.close();
}

run().catch(console.error);
