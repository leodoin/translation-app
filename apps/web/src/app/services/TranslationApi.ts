import axios from 'axios';

export const API_BASE_URI = process.env.NEXT_PUBLIC_API_BASE_URI;

export const getTranslations = async (sourceText:string, sourceLang:string, targetLang:string) => {

    return await axios.post(`https://${API_BASE_URI}/api/translation`, {
      text: sourceText,
      sourceLang,
      targetLang
    })
    .then((res) => res.data.translation)
    .catch(err => {
      console.error(err)
      return "";
    });
  }