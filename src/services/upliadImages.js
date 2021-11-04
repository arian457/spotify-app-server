const path = require('path')
const urlBaseDirectory = path.join(__dirname, '..', 'public' , "/")

const uploadImageService = async (image , imageName ) => {
  await image.mv(`${urlBaseDirectory}${imageName}`, async function (err) {
    if (err) {
      return false
    } else {
      return true
    }
  })
}

module.exports = {
  uploadImageService,
}
