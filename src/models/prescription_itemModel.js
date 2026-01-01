const db = require("../config/database");

const PrescriptionItem = {
  findByPrescriptionAndMedicine: (prescription_id, medicine_id, callback) => {
    const sql = `
    SELECT id FROM prescription_items
    WHERE prescription_id = ? AND medicine_id = ?
  `;
    db.get(sql, [prescription_id, medicine_id], callback);
  },

  // CREATE
  create: (data, callback) => {
    const sql = `
      INSERT INTO prescription_items
      (prescription_id, medicine_id, medicine_name, type, power, quantity, frequency)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.run(
      sql,
      [
        data.prescription_id,
        data.medicine_id,
        data.medicine_name,
        data.type,
        data.power,
        data.quantity,
        data.frequency,
      ],
      function (err) {
        callback(err, this?.lastID);
      }
    );
  },

  // GET BY PRESCRIPTION
  getByPrescriptionId: (prescription_id, callback) => {
    const sql = `
      SELECT *
      FROM prescription_items
      WHERE prescription_id = ?
    `;
    db.all(sql, [prescription_id], callback);
  },

  // DELETE
  delete: (id, callback) => {
    const sql = `DELETE FROM prescription_items WHERE id = ?`;
    db.run(sql, [id], function (err) {
      callback(err, this.changes);
    });
  },
};

module.exports = PrescriptionItem;
