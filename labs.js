import express from 'express';
import { serverRoot } from './serverUtils.js';

const router = express.Router();

router.get('/0', (req, res) => {
    const lab0Index = `${serverRoot}/labs/0/index.html`;

    res.status(200);
    res.set('Content-Type', 'text/html');
    res.sendFile(lab0Index);
});

export default router;
