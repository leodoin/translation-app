import {TranslationServiceClient} from '@google-cloud/translate';


const projectId = 'translation-app-api-438812';
const location = 'us-central1';
const text = `Cloud Translation API uses Google\'s neural machine translation technology to let you dynamically translate text through the API using Google pre-trained model, custom model, or a translation specialized large language model (LLMs).`

// Instantiates a client
const translationClient = new TranslationServiceClient();

export const translateText = async () => {
  // Construct request
  const request = {
    parent: `projects/${projectId}/locations/${location}`,
    contents: [text],
    mimeType: 'text/plain', // mime types: text/plain, text/html
    sourceLanguageCode: 'en',
    targetLanguageCode: 'fr',
  };

  // Run request
  const [response] = await translationClient.translateText(request);

  for (const translation of response.translations) {
    console.log(`Translation: ${translation.translatedText}`);
  }

  const translation = response.translations.map(t => t.translatedText).join('\n');

  return translation;
}