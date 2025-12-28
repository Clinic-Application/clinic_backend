const APIQueryBuilder = require("../utils/apiQueryBuilder");
const db = require("./../config/database");

const Patient = {
  // first create into database
  create: (data, callback) => {
    const sql = `
            INSERT INTO patient (fullname, age, gender, phone, address)
            VALUES (?, ?, ?, ?, ?)
        `;
    db.run(
      sql,
      [data.fullname, data.age, data.gender, data.phone, data.address],
      function (err) {
        callback(err, this?.lastID);
      }
    );
  },

  // Read all patient from database
  getAll: (queryString, callback) => {
    const qb = new APIQueryBuilder({
      table: "patient",
      queryString,
      allowedFields: [
        "patient_id",
        "fullname",
        "age",
        "gender",
        "phone",
        "address",
      ],
      searchableFields: ["fullname", "phone"],
      sortableFields: ["patient_id", "fullname", "age"],
    });

    const { sql, params } = qb
      .search()
      .filter()
      .sort()
      .limitFields()
      .paginate()
      .build();

    db.all(sql , params , callback);
  },

  // read one patient by ID
  getById: (id, callback) => {
    db.get("SELECT * FROM patient WHERE patient_id = ?", [id], callback);
  },

  // update patient
  update: (id, data, callback) => {
    const fields = [];
    const values = [];

    if (data.fullname !== undefined) {
      fields.push("fullname = ?");
      values.push(data.fullname);
    }

    if (data.age !== undefined) {
      fields.push("age = ?");
      values.push(data.age);
    }

    if (data.gender !== undefined) {
      fields.push("gender = ?");
      values.push(data.gender);
    }

    if (data.phone !== undefined) {
      fields.push("phone = ?");
      values.push(data.phone);
    }

    if (data.address !== undefined) {
      fields.push("address = ?");
      values.push(data.address);
    }

    if (fields.length === 0) {
      return callback(null, 0);
    }

    const sql = `
      UPDATE patient
      SET ${fields.join(", ")}
      WHERE patient_id = ?
    `;

    values.push(id);

    db.run(sql, values, function (err) {
      callback(err, this.changes);
    });
  },

  // delete
  delete: (id, callback) => {
    const sql = `
    DELETE FROM patient WHERE patient_id = ?
    `;

    db.run(sql, [id], function (err) {
      callback(err, this.changes);
    });
  },
};

module.exports = Patient;
