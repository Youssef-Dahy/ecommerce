export default class ApiFeature {
  constructor(mongooseQuery, queryString) {
    this.mongooseQuery = mongooseQuery;
    this.queryString = queryString;
  }

  pagination() {
    let page = this.queryString.page * 1 || 1;
    if (this.queryString.page <= 0) page = 1;
    let skip = (page - 1) * 4;
    this.page = page;
    this.mongooseQuery = this.mongooseQuery.skip(skip).limit(4); // Reassigned
    return this;
  }

  filter() {
    let filterObject = { ...this.queryString };
    let excludedQuery = ["page", "sort", "keyword", "fields"];
    excludedQuery.forEach((q) => {
      delete filterObject[q];
    });
    filterObject = JSON.stringify(filterObject);
    filterObject = filterObject.replace(
      /\bgt|gte|lt|lte\b/g,
      (match) => `$${match}`
    );
    filterObject = JSON.parse(filterObject);
    this.mongooseQuery = this.mongooseQuery.find(filterObject);
    // Reassigned
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      let sortBy = this.queryString.sort.split(",").join(" ");
      this.mongooseQuery = this.mongooseQuery.sort(sortBy); // Reassigned
    }
    return this;
  }

  search() {
    if (this.queryString.keyword) {
      this.mongooseQuery = this.mongooseQuery.find({
        $or: [
          { title: { $regex: req.query.keyword, $options: "i" } },
          { description: { $regex: req.query.keyword, $options: "i" } },
        ],
      });
    }
    return this;
  }

  fields() {
    if (this.queryString.fields) {
      let fields = this.queryString.fields.split(",").join(" ");
      this.mongooseQuery.select(fields);
    }
    return this;
  }
}
