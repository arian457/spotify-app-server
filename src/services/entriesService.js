const Repository = require("../repositories");
const entriesRepository = new Repository();
const entity = "Entries";

const findByIdEntry = (id) => entriesRepository.findById(entity, id);

const deleteById = (id) => entriesRepository.deleteById(entity, id);

const findByIdAndEditEntry = (id, params) =>
  entriesRepository.updatePayload(entity, id, params);

const createNews = (params) => entriesRepository.createPayload(entity, params);

module.exports = {
  findByIdEntry,
  findByIdAndEditEntry,
  createNews,
  deleteById
};
