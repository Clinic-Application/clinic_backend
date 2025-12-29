const db = require("../config/database");

const Visit = {
  // get all visits
  getByPatientId: (patientId, callback) => {
    const sql = `
      SELECT * FROM visit
      WHERE patient_id = ?
      ORDER BY visit_date DESC
    `;
    db.all(sql, [patientId], callback);
  },

  //   receive data of a visit by id
  getById: (visitId, callback) => {
    const sql = `
      SELECT * FROM visit
      WHERE visit_id = ?
    `;
    db.get(sql, [visitId], callback);
  },

  //   create a visit
  create: (patientId, data, callback) => {
    const {
      visit_date,
      symptoms,
      diagnosis,
      bp,
      bs,
      bg,
      temp,
      doctor_instruction,
      other_examination,
    } = data;

    const sql = `
      INSERT INTO visit (
        patient_id, visit_date, symptoms, diagnosis, bp, bs, bg, temp, doctor_instruction, other_examination
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.run(
      sql,
      [
        patientId,
        visit_date,
        symptoms,
        diagnosis,
        bp,
        bs,
        bg,
        temp,
        doctor_instruction,
        other_examination,
      ],
      function (err) {
        callback(err, this?.lastID);
      }
    );
  },

  //   update visit
  update: (visitId, data, callback) => {
    const fields = [];
    const values = [];

    Object.keys(data).forEach((key) => {
      fields.push(`${key} = ?`);
      values.push(data[key]);
    });

    if (fields.length === 0) {
      return callback(null, 0);
    }   

    const sql = `
      UPDATE visit
      SET ${fields.join(", ")}
      WHERE visit_id = ?
    `;

    values.push(visitId);

    db.run(sql, values, function (err) {
      callback(err, this.changes);
    });
  },

};

module.exports = Visit;
