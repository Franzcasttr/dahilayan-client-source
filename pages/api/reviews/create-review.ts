import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

const CreateReview = async (req: NextApiRequest, res: NextApiResponse) => {
  const { comment, roomById, userId, Rate, bookingId } = req.body;

  try {
    const result =
      await prisma.$executeRaw`;with create_review AS (INSERT INTO "Reviews" (id, "userId","comment","roomById","Rate") VALUES($1,$2,$3,$4,$5) RETURNING * , (${uuidv4()}, ${userId}, ${comment}, ${roomById}, ${Rate})), review_group AS (SELECT b.id, COALESCE(ROUND(AVG(c."Rate")::numeric, 1 ), 0) AS averageRating FROM "Rooms" b LEFT JOIN "Reviews" c ON c."roomById" = b.id GROUP BY b.id) UPDATE "Rooms" SET rating = averageRating FROM "Rooms" e INNER JOIN review_group ON e.id = review_group.id`;

    if (result === 1) {
      await prisma.bookings.update({
        where: {
          id: bookingId,
        },
        data: {
          toRate: 'rated',
        },
      });
    }
    res.status(200).json({ msg: 'Reviews created successfully' });
  } catch (error) {
    console.log(error);
    res.status(400).json({ errorMsg: 'Something went wrong' });
  }
};

export default CreateReview;
