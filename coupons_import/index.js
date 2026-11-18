
const AWS = require("aws-sdk");

const s3 = new AWS.S3({
    endpoint: "http://localhost.localstack.cloud:4566",
    region: "us-east-1",
    s3ForcePathStyle: true
});

exports.handler = async (event) => {
    try {
        const data = JSON.parse(event.body);
        const coupons = data.coupons;

        for (const coupon of coupons) {
            const fileName = coupon.coupon_id + ".json";

            await s3.putObject({
                Bucket: "coupons",
                Key: fileName,
                Body: JSON.stringify(coupon),
                ContentType: "application/json"
            }).promise();
        }

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "Coupons imported successfully"
            })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: "Error importing coupons"
            })
        };
    }
};
