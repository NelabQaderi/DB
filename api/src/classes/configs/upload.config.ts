// upload.config.ts
import { diskStorage } from 'multer';
import { extname, join } from 'path';

export const multerOptions = {
  storage: diskStorage({
    destination: join(__dirname, '../../../../ui/public/', 'students_image'),
    filename: (req, file, callback) => {
      const randomName = Array(32)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
      callback(null, `${randomName}${extname(file.originalname)}`);
    },
  }),
};
