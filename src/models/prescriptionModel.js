const db = require("../config/database");

const Prescription = {
  findById: (id, callback) => {
    const sql = `SELECT prescription_id FROM prescription WHERE prescription_id = ?`;
    db.get(sql, [id], callback);
  },

  create: (visit_id, callback) => {
    const sql = `INSERT INTO prescription (visit_id) values (?)`;
    db.run(sql, [visit_id], function (err) {
      if (err) return callback(err);
      callback(null, { prescription_id: this?.lastID });
    });
  },

  getByVisitId: (visit_id, callback) => {
    const sql = `SELECT * FROM prescription WHERE visit_id = ?`;
    db.get(sql, [visit_id], callback);
  },
};

module.exports = Prescription;
