const Repository = require("../repositories");
const organizationRepository = new Repository();
const entity = "Organization";

exports.findOrganizationById = async id => {
  return organizationRepository.findByIdWithAssociation(entity, id, "SocialNetwork");
};
