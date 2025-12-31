const db = require("../config/database");

const Prescription = {
  create: (visit_id, callback) => {
    const sql = `INSERT INTO prescription (visit_id) values (?)`;
    db.run(sql, [visit_id], function (err) {
        if(err) return callback(err);
      callback(null, {prescription_id : this?.lastID});
    });
  },

  getByVisitId: (visit_id, callback) => {
    const sql = `SELECT * FROM prescription WHERE visit_id = ?`;
    db.get(sql, [visit_id], callback);
  },
};

module.exports = Prescription;
