import http from "k6/http";
import { check } from "k6";
import { BASE_URL, DEFAULT_OPTIONS } from "./config.js";

export const options = DEFAULT_OPTIONS;

export default function () {

    const payload = JSON.stringify({
        email: "test@example.com",
        password: "password123",
    });

    const params = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    const response = http.post(
        `${BASE_URL}/auth/login`,
        payload,
        params
    );

    check(response, {
        "status is 200": (r) => r.status === 200,
    });

}