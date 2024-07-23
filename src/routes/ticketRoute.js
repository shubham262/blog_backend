import express from 'express';
import {
	createNewSupportingTickets,
	getAllSupportingTickets,
	getAllAssociatedTickets,
} from '../controllers/ticketController.js';
const router = express.Router();

router.route('/support-tickets').post(createNewSupportingTickets);
router.route('/support-agent-tickets').post(getAllAssociatedTickets);
router.route('/support-tickets').get(getAllSupportingTickets);
router.route('/health').get((req, res) => {
	res.send('hello');
});

export const TicketRoute = router;
