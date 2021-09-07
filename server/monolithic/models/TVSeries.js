const { getDatabase } = require("../config");
const TVSeriesCollection = 'TVSeries'

class TVSeries {
  static find() {
    return getDatabase().collection(TVSeriesCollection).find().toArray()
  }
  static findOne(query) {
    return getDatabase().collection(TVSeriesCollection).find(query).toArray()
  }
  static create(data) {
    return getDatabase().collection(TVSeriesCollection).insertOne(data)
  }
  static delete(query) {
    return getDatabase().collection(TVSeriesCollection).remove(query)
  }
  static update(newData, query) {
    return getDatabase().collection(TVSeriesCollection).updateOne(newData, query)
  }
}

module.exports = TVSeries;