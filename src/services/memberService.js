const Repository = require("../repositories");
const memberRepository = new Repository();
const entity = "Member";

const getMembers = () => {
  return memberRepository.findAll(entity, ["id", "name", "image"]);
};

const createMember = member => {
  return memberRepository.createPayload(entity, member);
};

const deleteMember = async id => {
  const member = await memberRepository.findById(entity, id);

  if (!member) {
    const err = new Error("Miembro no encontrado");
    err.details =
      "El ID proporcionado no pertence a nigun miembro de la base de datos";
    throw err;
  }

  const deletedUser = await memberRepository.deleteById(entity, id);
  return deletedUser;
};

const updateMember = async (id, payload) => {
  const member = await memberRepository.findById(entity, id);
  if (!member) {
    const err = new Error("Miembro no encontrado");
    err.details =
      "El ID proporcionado no pertence a nigun miembro de la base de datos";
    throw err;
  }

  return await memberRepository.updatePayload(entity, id, payload);
};

module.exports = { getMembers, createMember, deleteMember, updateMember };
