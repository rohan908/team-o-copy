import express, { Router, Request, Response } from 'express';
import PrismaClient from '../bin/prisma-client';

const router: Router = express.Router();

router.post('../', async (req: Request, res: Response) => {
    // For inputting a request form, adds entry
  const { language,room, date, time, description, } = req.body;

});

// Retrieves all language service request forms
router.get('/', async (req: Request, res: Response) => {
    const allServiceRequests = await PrismaClient.langaugeServiceRequest.findMany({});
    console.log(allServiceRequests);
    res.json(allServiceRequests);
});

function convertTo24Hour(time: string): string {
  const [raw, modifier] = time.split(' ');
  let [hours, minutes] = raw.split(':').map(Number);

  if (modifier === 'PM' && hours !== 12) hours += 12;
  if (modifier === 'AM' && hours === 12) hours = 0;

  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}


export default router;
