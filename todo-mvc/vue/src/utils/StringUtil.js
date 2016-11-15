import ObjectId from 'bson-objectid'

export const generateObjectId = function () {
  return ObjectId(new Date().getTime()).toString()
}