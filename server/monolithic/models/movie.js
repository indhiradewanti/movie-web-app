const { getDatabase } = require("../config");
const movieCollection = 'Movies'

class movie {
  static find() {
    return getDatabase().collection(movieCollection).find().toArray()
  }
  static findOne(query) {
    return getDatabase().collection(movieCollection).find(query).toArray()
  }
  static create(data) {
    return getDatabase().collection(movieCollection).insertOne(data)
  }
  static delete(query) {
    return getDatabase().collection(movieCollection).remove(query)
  }
  static update(newData, query) {
    return getDatabase().collection(movieCollection).updateOne(newData, query)
  }
}

module.exports = movie;