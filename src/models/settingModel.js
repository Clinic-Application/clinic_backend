const db = require("./../config/database");

const Setting = {
  get: (callback) => {
    const sql = `SELECT * FROM setting LIMIT 1`;
    db.get(sql, [], callback);
  },

  create: ({ logo, name, phone, address }, callback) => {
    const sql = `
      INSERT INTO setting (logo, name, phone, address)
      VALUES (?, ?, ?, ?)
    `;
    db.run(sql, [logo, name, phone, address], function (err) {
      callback(err, this?.lastID);
    });
  },

  update: ({ logo, name, phone, address }, callback) => {
    const sql = `
      UPDATE setting
      SET logo = ?, name = ?, phone = ?, address = ?
      WHERE id = 1
    `;
    db.run(sql, [logo, name, phone, address], callback);
  },
};

module.exports = Setting;
