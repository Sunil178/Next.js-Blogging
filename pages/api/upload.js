import { parseForm } from "libs/store-form-media";

export default async function handler(req, res) {

  if (req.method == 'POST') {
    try {
      const { files, absolute_path } = await parseForm(req);
      // const file = files.file;
      // let url = Array.isArray(file) ? file.map((f) => f.filepath)[0] : file.filepath;
      return res.status(200).json({ location: absolute_path });
    } catch (error) {
      return res.status(400).json({ success: false, data: error });
    }
  } else {
    return res.status(405).send("Method not allowed");
  }
};

export const config = {
  api: {
    bodyParser: false,
  },
};