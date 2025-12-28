class APIQueryBuilder {
  constructor({
    table,
    queryString,
    allowedFields,
    searchableFields,
    sortableFields,
  }) {
    this.table = table;
    this.queryString = queryString;

    this.allowedFields = allowedFields;
    this.searchableFields = searchableFields;
    this.sortableFields = sortableFields;

    this.whereClauses = [];
    this.params = [];

    this.selectFields = "*";
    this.orderBy = "";
    this.limit = "";
    this.offset = "";
  }

  // searching

  search() {
    if (this.queryString.search && this.searchableFields.length > 0) {
      const likeClause = this.searchableFields
        .map((field) => `${field} LIKE ?`)
        .join(" OR ");

      this.whereClauses.push(`(${likeClause})`);

      this.searchableFields.forEach(() => {
        this.params.push(`%${this.queryString.search}%`);
      });
    }
    return this;
  }

  //   filtering
  filter() {
    Object.keys(this.queryString).forEach((key) => {
      if (
        !["page", "limit", "sort", "fields", "search"].includes(key) &&
        this.allowedFields.includes(key)
      ) {
        this.whereClauses.push(`${key} = ?`);
        this.params.push(this.queryString[key]);
      }
    });
    return this;
  }

  //   sorting
  sort() {
    if (this.queryString.sort) {
      const field = this.queryString.sort.replace("-", "");
      const direction = this.queryString.sort.startsWith("-") ? "DESC" : "ASC";

      if (this.sortableFields.includes(field)) {
        this.orderBy = `ORDER BY ${field} ${direction}`;
      }
    } else {
      this.orderBy = "";
    }
    return this;
  }

  //   limitFields
  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields
        .split(",")
        .filter((f) => this.allowedFields.includes(f));

      if (fields.length > 0) {
        this.selectFields = fields.join(", ");
      }
    }
    return this;
  }

  //   pagination
  paginate() {
    const page = parseInt(this.queryString.page) || 1;
    const limit = parseInt(this.queryString.limit) || 10;

    this.limit = `LIMIT ${limit}`;

    // how many rows ignored
    this.offset = `OFFSET ${(page - 1) * limit}`;

    return this;
  }

  //   build query
  build() {
    let sql = `SELECT ${this.selectFields} FROM ${this.table}`;

    if (this.whereClauses.length) {
      sql += " WHERE " + this.whereClauses.join(" AND ");
    }

    if (this.orderBy) {
      sql += " " + this.orderBy;
    }

    if (this.limit) {
      sql += " " + this.limit + " " + this.offset;
    }

    return {
      sql,
      params: this.params,
    };
  }
}
module.exports = APIQueryBuilder;