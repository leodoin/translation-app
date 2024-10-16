import express from 'express';
import { translateText } from './translation-service';
import cors from 'cors';

const app = express()
const port = parseInt(process.env.PORT) || 8080;

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/api/translation', async (req, res) => {
    const { text, sourceLang, targetLang } = req.body;
    if (!text || !sourceLang || !targetLang) {
        res.status(400).json({error: 'Missing required fields'})
        return
    }
    const translation = await translateText(text, sourceLang, targetLang);
    res.json({translation});
    return
})


app.listen(port, () => {
  console.log(`app listening on http://localhost:${port}`)
})
