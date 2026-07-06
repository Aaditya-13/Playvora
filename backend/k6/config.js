export const BASE_URL =
    __ENV.BASE_URL ||
    "http://localhost:3000/api/v1";

export const DEFAULT_OPTIONS = {
    stages: [
        { duration: "30s", target: 10 },
        { duration: "1m", target: 50 },
        { duration: "1m", target: 100 },
        { duration: "30s", target: 0 },
    ],
};