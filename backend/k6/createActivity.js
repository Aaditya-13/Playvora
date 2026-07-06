import http from "k6/http";
import { check } from "k6";
import { BASE_URL, DEFAULT_OPTIONS } from "./config.js";

export const options = DEFAULT_OPTIONS;

export default function () {

    // Replace with a valid JWT before benchmarking

    const token = "YOUR_ACCESS_TOKEN";

    const payload = JSON.stringify({

        title: "k6 Football Match",

        sport: "football",

        groundName: "Test Ground",

        address: "Nashik",

        latitude: 20.0059,

        longitude: 73.791,

        scheduledAt: "2026-07-20T18:00:00.000Z",

        maxPlayers: 10,

        skillLevel: "intermediate",

        venueType: "outdoor",

        joinPolicy: "approval",

        genderPreference: "any",

        visibilityRadius: 5000,

    });

    const params = {

        headers: {

            Authorization: `Bearer ${token}`,

            "Content-Type": "application/json",

        },

    };

    const response = http.post(
        `${BASE_URL}/activities`,
        payload,
        params
    );

    check(response, {
        "status is 201": (r) => r.status === 201,
    });

}