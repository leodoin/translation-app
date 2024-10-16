import {TranslationServiceClient} from '@google-cloud/translate';


const projectId = 'translation-app-api-438812';
const location = 'us-central1';
// Instantiates a client
const translationClient = new TranslationServiceClient();

export const translateText = async (text:string, sourceLanguageCode:string, targetLanguageCode:string) => {
  // Construct request
  const request = {
    parent: `projects/${projectId}/locations/${location}`,
    contents: [text],
    mimeType: 'text/plain',
    sourceLanguageCode,
    targetLanguageCode,
  };

  // Run request
  const [response] = await translationClient.translateText(request);

  for (const translation of response.translations) {
    console.log(`Translation: ${translation.translatedText}`);
  }

  const translation = response.translations.map(t => t.translatedText).join('\n');

  return translation;
}