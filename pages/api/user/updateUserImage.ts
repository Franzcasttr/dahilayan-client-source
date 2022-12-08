import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth';
import nc from 'next-connect';
import { ImageUpload } from '../../../utils/ImageUploader';
import { uploadImage } from '../../../utils/multer';
import { authOptions } from '../auth/[...nextauth]';

const prisma = new PrismaClient();

interface MulterRequest extends NextApiRequest {
  file: {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    destination: string;
    filename: string;
    path: string;
    size: number;
  };
}

export const config = {
  api: {
    bodyParser: false,
  },
};

const updateUserImage = nc()
  .use(uploadImage.single('profile'))
  .post(async (req: MulterRequest, res: NextApiResponse) => {
    const session = await unstable_getServerSession(req, res, authOptions);
    const imageFile = req.file;
    if (!session)
      res.status(403).json({ errorMsg: 'Please login to continue' });

    if (!imageFile) res.status(403).json({ errorMsg: 'Image file not found' });
    if (imageFile.mimetype !== 'image/jpeg')
      res.status(403).json({ errorMsg: 'Image file is not supported' });

    const uploadImage = async (url: string) => await ImageUpload(url);
    const image = (await uploadImage(imageFile.path)) as string;
    fs.unlinkSync(imageFile.path);

    try {
      const result = await prisma.user.update({
        where: {
          id: session?.id as string,
        },
        data: {
          image,
        },
      });
      res.status(200).json({ result });
    } catch (error) {
      res.status(403).json({ errorMsg: 'Error uploading image' });
    }
  });

export default updateUserImage;
