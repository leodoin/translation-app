import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

console.log('WEB_API_URL:', process.env.WEB_API_URL);
console.log('PORT:', process.env.PORT);

const app = express()
const port = parseInt(process.env.PORT || '8080');

app.use(cors({origin: process.env.WEB_APP_URL}))
console.log(`CORS enabled for ${process.env.WEB_APP_URL}`)
app.use(express.json())

app.listen(port, () => {
  console.log(`app listening on http://localhost:${port}`)
})

export default app; // Export the express app