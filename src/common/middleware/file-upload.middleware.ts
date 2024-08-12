import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as multer from 'multer';

@Injectable()
export class FileUploadMiddleware implements NestMiddleware {
  private upload = multer({
    storage: multer.diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        console.log("inside multer");
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + '-' + file.originalname);
      },
    }),
  }).single('image');

  use(req: Request, res: Response, next: NextFunction) {
    console.log("inside middlewareee");
    this.upload(req, res, (err) => {
      if (err) {
        return next(err);
      }
      if (req.file) {
        
        req.body.image = req.file.filename;
      }
      next();
    });
  }
}