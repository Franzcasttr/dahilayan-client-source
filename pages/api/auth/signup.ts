import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import bcrypt, { genSalt } from 'bcrypt';

const SignUp = async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, email, password } = req.body;
  const hashPassword = await bcrypt.hash(password, 10);

  try {
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashPassword,
      },
    });
    res.status(201).json({ msg: 'Account created successfully' });
  } catch (error) {
    console.log(error);
  }
};

export default SignUp;
