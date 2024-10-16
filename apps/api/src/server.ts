import express from 'express';
import { translateText } from './translation-service';
const app = express()
const port = parseInt(process.env.PORT) || 8080;

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/api/translation', async (req, res) => {
    const translation = await translateText();
    res.json({translation});
})


app.listen(port, () => {
  console.log(`app listening on http://localhost:${port}`)
})