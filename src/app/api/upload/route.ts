import {NextRequest} from "next/server";
import {S3} from 'aws-sdk';

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const files = formData.getAll('files') as File[];
  const s3Client = new S3({
    region: 'us-east-1',
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY as string,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY as string,
    },
  });
  const bucketName = process.env.S3_BUCKET as string;
  const fileUrls:string[] = [];
  for (const file of files) {
    if (file.size > 10*1024*1024) {
      continue;
    }
    const newFilename = `${Date.now()}-${file.name}`;
    await s3Client.upload({
      Bucket: bucketName,
      Key: newFilename,
      ContentType: file.type,
      ACL: 'public-read',
      Body: Buffer.from(await file.arrayBuffer()),
    }).promise();

    const fileUrl = `https://${bucketName}.s3.us-east-1.amazonaws.com/${newFilename}`;
    fileUrls.push(fileUrl);
  }

  return Response.json(fileUrls);
}
