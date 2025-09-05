import express from 'express';
import labsRouter from './labs.js';
import { serverRoot, baseUrl } from './serverUtils.js';

const port = process.env.PORT || 3000;
const app = express();

app.use('/lab0/js', express.static(`${serverRoot}/labs/0/js`));
app.use('/lab0/css', express.static(`${serverRoot}/labs/0/css`));
app.use('/lab0/lang', express.static(`${serverRoot}/labs/0/lang`));

app.use(`${baseUrl}/labs`, labsRouter);

app.listen(port, () => {
    console.log(`Server running on ${port}`);
});
