import mongoose from "mongoose";

import {
  SPORTS,
  SKILL_LEVELS,
  VENUE_TYPES,
  JOIN_POLICIES,
  GENDER_PREFERENCES,
  ACTIVITY_STATUS,
} from "../constants/activity.constants.js";

const activitySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    description: {
      type: String,
      default: "",
      maxlength: 500,
    },

    sport: {
      type: String,
      required: true,
      enum: SPORTS,
    },

    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      }
    ],

    groundName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    address: {
      type: String,
      required: true,
      trim: true,
      maxlength: 300,
    },

    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
        required: true,
      },

      coordinates: {
        type: [Number],
        required: true,

        validate: {
          validator(value) {
            return value.length === 2;
          },
          message: "Coordinates must contain [longitude, latitude].",
        },
      },
    },

    scheduledAt: {
      type: Date,
      required: true,
    },

    maxPlayers: {
      type: Number,
      required: true,
      min: 2,
    },

    currentPlayers: {
      type: Number,
      default: 1,
      min: 1,
    },

    skillLevel: {
      type: String,
      enum: SKILL_LEVELS,
      default: "beginner",
    },

    venueType: {
      type: String,
      enum: VENUE_TYPES,
      default: "outdoor",
    },

    joinPolicy: {
      type: String,
      enum: JOIN_POLICIES,
      default: "approval",
    },

    genderPreference: {
      type: String,
      enum: GENDER_PREFERENCES,
      default: "any",
    },

    cost: {
      amount: {
        type: Number,
        default: 0,
        min: 0,
      },

      currency: {
        type: String,
        default: "INR",
      },

      description: {
        type: String,
        default: "",
        maxlength: 100,
      },
    },

    notes: {
      type: String,
      default: "",
      maxlength: 500,
    },

    visibilityRadius: {
      type: Number,
      default: 5000,
      min: 1000,
      max: 50000,
    },

    status: {
      type: String,
      enum: ACTIVITY_STATUS,
      default: "open",
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);


activitySchema.index({
    location: "2dsphere",
});


activitySchema.index({
    organizer: 1,
});


activitySchema.index({
    scheduledAt: 1,
});



const Activity = mongoose.model("Activity", activitySchema);

export default Activity;