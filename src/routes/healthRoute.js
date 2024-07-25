import express from 'express';
const router = express.Router();
router.route('/health').get((req, res) => {
	res.send('hello');
});

export const healthRoute = router;
