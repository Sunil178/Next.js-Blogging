import mime from "mime";
import { join } from "path";
import formidable from "formidable";
import { mkdir, stat } from "fs/promises";
import { v1 as uuidv1 } from 'uuid';

export const parseForm = async ( req ) => {
  return new Promise(async (resolve, reject) => {

    const today = new Date().toLocaleDateString('en-IN', { timezone: 'Asia/Kolkata' }).split('/');
    var absolute_path = '/uploads/' + today[2] + '-' + today[1] + '-' + today[0];
    const uploadDir = join(
      process.env.ROOT_DIR || process.cwd(),
      absolute_path
    );

    try {
      await stat(uploadDir);
    } catch (e) {
      if (e.code === "ENOENT") {
        await mkdir(uploadDir, { recursive: true });
      } else {
        console.error(e);
        reject(e);
        return;
      }
    }

    const form = formidable({
      maxFiles: 100,
      maxFileSize: 1024 * 1024 * 100, // 100mb
      uploadDir,
      filename: (_name, _ext, part) => {
        const uniqueSuffix = uuidv1();
        const filename = `${part.name || "unknown"}-${uniqueSuffix}.${
          mime.getExtension(part.mimetype || "") || "unknown"
        }`;
        absolute_path += '/' + filename;
        return filename;
      },
      filter: (part) => {
        return (
          part.name === "file" && (part.mimetype?.includes("image") || false)
        );
      },
    });

    
    form.parse(req, function (err, fields, files) {
      if (err) reject(err);
      else resolve({ files, absolute_path });
    });
  });
};