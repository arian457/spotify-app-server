const Repository = require("../repositories");
const testimonialRespository = new Repository();
const entity = "Testimonials";

const create = async testimonial => {
  return await testimonialRespository.createPayload(entity, testimonial);
};

module.exports = {
  create,
};
