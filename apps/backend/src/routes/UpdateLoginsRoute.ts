import express from 'express';
import UpdateLogins from '../PopulateEmployee/UpdateLogins.ts';

const router = express.Router();
// add manual endpoint to seed employee db
router.post('/UpdateLogins', async (req, res) => {
    try {
        await UpdateLogins();
        res.status(200).json({ message: 'Successfully populated Employee Database from Clerk' });
    } catch (error) {
        console.error(`Unable to establish database connection:`, error);
        res.status(500).json({ message: 'Unable to establish database connection' });
    }
});
export default router;
