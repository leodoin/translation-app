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
    if(sourceLang === targetLang) {
        res.status(400).json({error: 'Source and target languages must be different'})
        return
    }
    const translation = await translateText(text, sourceLang, targetLang)
    .catch(err => {
        console.error(err)
        res.status(500).json({
            error: 'An error occurred while translating the text',
            details: err.details
        })
    }).then(translation => res.json({translation}));
});


app.listen(port, () => {
  console.log(`app listening on http://localhost:${port}`)
})
