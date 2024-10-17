import { translateText } from './translation-service';
import asyncHandler from 'express-async-handler';

export const translationApi = asyncHandler(async (req, res) => {
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
