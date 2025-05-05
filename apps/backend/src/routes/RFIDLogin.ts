import express, { Router, Request, Response } from 'express';

const router: Router = express.Router();

// this route is used for logging in via RFID
// the path to this router is '/api/loginRFID'

router.get('/:cardID', async (req: Request, res: Response) => {
    const ID = req.params.cardID;

    if(ID == "05682403") {
      const link = "/auto-login?email=softengD25O@gmail.com&password=cs3733D25O&redirectTo=/";
      res.json(link);
    } else if (ID == "3D56CE01") {
      const link = "/auto-login?email=staffD25O@gmail.com&password=cs3733D25O&redirectTo=/";
        res.json(link);
    }
});

export default router;
