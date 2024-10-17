import express from 'express';
import cors from 'cors';
import { translationApi } from './src/translation-api';
import { helloWorldApi } from './src/hello-world-api';

const env = process.env.NODE_ENV || "dev";
const config = require(`./config.${env}.json`);

console.log('NODE_ENV:', process.env.NODE_ENV);

const { port, allowCors } = config

const app = express()

app.use(cors(allowCors))
console.log(`CORS enabled for ${allowCors.origin}`)

app.use(express.json())


app.listen(port, () => {
  console.log(`app listening on http://localhost:${port}`)
})

app.get('/', helloWorldApi)

app.post('/api/translation', translationApi)

export default app;