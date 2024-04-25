import AWS from 'aws-sdk';

AWS.config.update({
  region: process.env.region,
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey
});

const rekognition = new AWS.Rekognition();
const s3 = new AWS.S3();

rekognition.listCollections({}, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     {
    console.log("Succececececece")
    console.log(data);}           // successful response
});

export {AWS, s3, rekognition}