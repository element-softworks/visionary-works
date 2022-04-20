module.exports = ({ env }) => {
  console.log(env("AWS_ACCESS_KEY_ID"));
  console.log(env("AWS_ACCESS_SECRET"));
  console.log(env("AWS_REGION"));
  console.log(env("AWS_BUCKET"));
  return {
    // ...
    upload: {
      provider: "aws-s3",
      providerOptions: {
        accessKeyId: env("AWS_ACCESS_KEY_ID"),
        secretAccessKey: env("AWS_ACCESS_SECRET"),
        region: env("AWS_REGION"),
        params: {
          Bucket: env("AWS_BUCKET")
        }
      }
    }
  };
};
