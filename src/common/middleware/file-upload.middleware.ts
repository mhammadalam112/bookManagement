import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as multer from 'multer';
import * as multerS3 from 'multer-s3';
import * as AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID, 
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

var fileName;

@Injectable()
export class FileUploadMiddleware implements NestMiddleware {
  private upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: process.env.S3_BUCKET_NAME,
      metadata: (req, file, cb) => {
        cb(null, { fieldName: file.fieldname });
      },
      key: (req, file, cb) => {
        const uniqueSuffix = Date.now();
        fileName = uniqueSuffix + '-' + file.originalname;
        cb(null, fileName);
      },
    }),
  }).single('image');

  use(req: Request, res: Response, next: NextFunction) {
    this.upload(req, res, (err) => {
      console.log("req.file: " + JSON.stringify(req.file));
      if (err) {
        return next(err);
      }
      if (req.file) {
        req.body.image = fileName;
      }
      next();
    });
  }
}