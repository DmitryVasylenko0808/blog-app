import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 } from 'uuid';

export const uploadsStorage = diskStorage({
  destination: './uploads',
  filename(req, file, callback) {
    callback(null, generateFilename(file));
  },
});

const generateFilename = (file: Express.Multer.File) => {
  const name = `${v4()}${extname(file.originalname)}`;

  return name;
};
