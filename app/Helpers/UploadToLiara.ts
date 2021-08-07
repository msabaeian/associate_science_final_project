import * as AWS from "aws-sdk";
import Env from '@ioc:Adonis/Core/Env'
import { cuid } from '@ioc:Adonis/Core/Helpers'
import { MultipartFileContract } from '@ioc:Adonis/Core/BodyParser';
const fs = require('fs')

const s3 = new AWS.S3({
    accessKeyId: Env.get('LIARA_ACCESS_KEY'),
    secretAccessKey: Env.get('LIARA_SECRET_KEY'),
    endpoint: Env.get('LIARA_ENDPOINT'),
    s3ForcePathStyle: true
});

export const uploadToLiaraBucket = async (file: MultipartFileContract): Promise<string> => {
  try {
    const { type, subtype, extname } = file;
    let mimeType = type + "/" + subtype;
    const bucket = Env.get('LIARA_BUCKET')
    const name = cuid() + "." + extname;
    const upload = await s3
      .putObject({
        Key: name,
        Bucket: bucket,
        ContentType: mimeType,
        Body: fs.createReadStream(file.tmpPath),
        ACL: "public-read",
      })
      .promise();
    return `${Env.get('LIARA_ENDPOINT')}/${bucket}/${name}`
  } catch (err) {
    console.log(err);
    return err;
  }
};