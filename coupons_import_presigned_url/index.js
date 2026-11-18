
const AWS = require("aws-sdk");

const s3 = new AWS.S3({
    endpoint: "http://localhost.localstack.cloud:4566",
    region: "us-east-1",
    s3ForcePathStyle: true,
    signatureVersion: "v4"
});

exports.handler = async (event) => {
    try {
        const data = JSON.parse(event.body);
        const fileName = data.file_name;

        const url = await s3.getSignedUrlPromise("putObject", {
            Bucket: "coupons",
            Key: fileName,
            ContentType: "application/json",
            Expires: 300
        });

        return {
            statusCode: 200,
            body: JSON.stringify({
                url: url
            })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: "Error generating presigned URL"
            })
        };
    }
};
