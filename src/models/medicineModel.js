const db = require("../config/database");

const Medicine = {
  findById: (id, callback) => {
    const sql = `SELECT medicine_id FROM medicine WHERE medicine_id = ?`;
    db.get(sql, [id], callback);
  },

  // create
  create: (data, callback) => {
    const sql = `INSERT INTO medicine (name, type, power) values (?, ?, ?)`;

    db.run(sql, [data.name, data.type, data.power], function (err) {
      callback(err, this?.lastID);
    });
  },

  //   Get all
  getAll: (callback) => {
    const sql = `SELECT * FROM medicine ORDER BY name ASC`;
    db.all(sql, [], callback);
  },

  // getOne
  getById: (id, callback) => {
    const sql = `SELECT * FROM medicine WHERE medicine_id = ?`;
    db.get(sql, [id], callback);
  },

  //  update
  update: (id, data, callback) => {
    const sql = `UPDATE medicine SET name = ?, type = ?, power = ? WHERE medicine_id = ? `;
    db.run(sql, [data.name, data.type, data.power, id], function (err) {
      callback(err, this.changes);
    });
  },

  //   Delete
  delete: (id, callback) => {
    const sql = `DELETE FROM medicine WHERE medicine_id = ?`;
    db.run(sql, [id], function (err) {
      callback(err, this.changes);
    });
  },
};

module.exports = Medicine;
