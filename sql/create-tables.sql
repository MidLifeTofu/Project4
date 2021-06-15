DROP TABLE IF NOT EXISTS users,

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    surname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

DROP TABLE IF NOT EXISTS schedules,

CREATE TABLE schedules (
    id SERIAL PRIMARY KEY,
    user_ID NOT NULL INTEGER,
    day INTEGER NOT NULL CHECK (day >= 1 AND day <= 7),
    start_at TIME NOT NULL,
    end_at TIME NOT NULL
);