//Documentation

//entity  >>>> Name of Entity model ||| type String /// example "Users"
//attr >>>>  array of attributes required ||| type Array of Strings /// example ["firstName", "lastName"]
//id >>>> id of item ||| type number /// example 1
//params >>>> object with search parameters||| type object /// example {email:"email@email.com"}

//relation >>> incoming...

class Repositories {
  constructor() {
    this.models = require("../models");
  }

  findAll = async (entity, attr, relation) => {
    return await this.models[entity].findAll({
      attributes: attr?.length ? attr : "",
    });
  };

  findAllByParams = async (entity, params, attr) => {
    return await this.models[entity].findAll({
      attributes: attr?.length ? attr : "",
      where: params,
    });
  };

  findById = async (entity, id, attr) => {
    return await this.models[entity].findByPk(id, {
      attributes: attr?.length ? attr : "",
    });
  };

  findByParams = async (entity, params, attr) => {
    return await this.models[entity].findOne({
      attributes: attr?.length ? attr : "",
      where: params,
    });
  };

  createPayload = async (entity, payload) => {
    return await this.models[entity].create(payload);
  };

  updatePayload = async (entity, id, payload) => {
    const elementToUpdate = await this.findById(entity, id);

    if (elementToUpdate === null) return undefined;

    return await elementToUpdate.update(payload);
  };

  deleteById = async (entity, id) => {
    return await this.models[entity].destroy({
      where: {
        id,
      },
    });
  };

  findByIdWithAssociation = async (entity, id, association) => {
    return await this.models[entity].findByPk(id, {
      include: [{ model: this.models[association] }],
    });
  };
}

module.exports = Repositories;
