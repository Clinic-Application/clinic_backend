const db = require('./src/config/database');

db.exec(
    `
    CREATE TABLE patient (
    patient_id INTEGER PRIMARY KEY AUTOINCREMENT,
    fullname TEXT NOT NULL,
    age INTEGER NOT NULL,
    gender TEXT NOT NULL,
    phone TEXT UNIQUE,
    address TEXT
);


CREATE TABLE visit (
    visit_id INTEGER PRIMARY KEY AUTOINCREMENT,
    patient_id INTEGER NOT NULL,
    visit_date TEXT,
    symptoms TEXT,
    diagnosis TEXT,
    bp TEXT,
    bs TEXT,
    bg TEXT,
    temp TEXT,
    doctor_instruction TEXT,
    other_examination TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patient(patient_id)
);


CREATE TABLE medicine (
    medicine_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    type TEXT,
    power TEXT
);


CREATE TABLE setting (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    logo TEXT,
    name TEXT,
    phone TEXT,
    address TEXT
);


CREATE TABLE medical_history (
    history_id INTEGER PRIMARY KEY AUTOINCREMENT,
    visit_id INTEGER NOT NULL,
    past_condition TEXT,
    allergies TEXT,
    surgical_history TEXT,
    FOREIGN KEY (visit_id) REFERENCES visit(visit_id)
);

CREATE TABLE prescription (
    prescription_id INTEGER PRIMARY KEY AUTOINCREMENT,
    visit_id INTEGER NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (visit_id) REFERENCES visit(visit_id)
);

CREATE TABLE prescription_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    prescription_id INTEGER NOT NULL,
    medicine_id INTEGER NOT NULL,
    medicine_name TEXT,
    type TEXT,
    power TEXT,
    quantity INTEGER,
    frequency TEXT,
    FOREIGN KEY (prescription_id) REFERENCES prescription(prescription_id),
    FOREIGN KEY (medicine_id) REFERENCES medicine(medicine_id)
);
    `
);

