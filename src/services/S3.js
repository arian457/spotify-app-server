const config = require("../config/config").development;
var AWS = require("aws-sdk");
// Set the region
// Create S3 service object
const BUCKET = config.aws_bucket_name;
AWS.config.update({ region: "sa-east-1" });

s3 = new AWS.S3({
  apiVersion: "2006-03-01",
  credentials: {
    accessKeyId: config.aws_access_key_id,
    secretAccessKey: config.aws_secret_access_key,
  },
});

const uploadToBucket = async (params, callback) => {
  const uploadParams = {
    Bucket: BUCKET,
    Key: params.key,
    Body: params.buffer,
  };

  return await s3.upload(uploadParams).promise();
};

const deleteObjectOnBucket = key => {
  var deleteParams = {
    Bucket: BUCKET,
    Key: key,
  };

  s3.deleteObject(deleteParams, (err, data) => {
    if (err) {
      console.log(err, err.stack);
    } else {
      console.log("Object Deleted", data);
    }
  });
};

const objectListOnBucket = (objectFileName = "") => {
  var bucketParams = {
    Bucket: BUCKET,
    Prefix: objectFileName,
  };

  s3.listObjects(bucketParams, (err, data) => {
    if (err) {
      console.log("Error", err);
    } else {
      console.log(data.Contents);
    }
  });
};

module.exports = {
  uploadToBucket,
  deleteObjectOnBucket,
  objectListOnBucket,
};
