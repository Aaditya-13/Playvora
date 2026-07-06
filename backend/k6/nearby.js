import http from "k6/http";
import { check } from "k6";
import { BASE_URL, DEFAULT_OPTIONS } from "./config.js";

export const options = DEFAULT_OPTIONS;

export default function () {

    const response = http.get(
        `${BASE_URL}/activities/nearby`
    );

    check(response, {
        "status is 200": (r) => r.status === 200,
    });

}