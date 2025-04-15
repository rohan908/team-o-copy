import express, { Router, Request, Response } from 'express';
import PrismaClient from '../bin/prisma-client';

const router: Router = express.Router();

// uploads the language request service form to the database table
router.post('/', async (req: Request, res: Response) => {
  console.log('Incoming POST to /api/maintenance');
  console.log('Request body:', req.body);

  try {
    // For inputting a request form, adds entry
    const { label, selectedDate, selectedTime, roomNumber, description, status } = req.body;

    // creating request to get data from frontend
    const request = await PrismaClient.maintenanceServiceRequest.create({
      data: {
        maintenanceType: label,
        date: selectedDate,
        time: convertTo24Hour(selectedTime),
        room: roomNumber,
        description: description,
        status: status},
    });

    console.log('Saved to DB:', request);

    res.status(201).json(request);
  } catch (error) {
    console.error('Error saving request:', error);
    res.status(500).json({ error: 'Failed to create request', details: error });
  }
});

// Retrieves all  service request forms
// this will be for posting on the website
router.get('/', async (req: Request, res: Response) => {
  const allServiceRequests = await PrismaClient.maintenanceServiceRequest.findMany({});
  res.json(allServiceRequests);
});

// helper function for converting the database time value
// to a more readable string
function convertTo24Hour(time: string): string {
  const [raw, modifier] = time.split(' ');
  let [hours, minutes] = raw.split(':').map(Number);

  if (modifier === 'PM' && hours !== 12) hours += 12;
  if (modifier === 'AM' && hours === 12) hours = 0;

  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}

export default router;
