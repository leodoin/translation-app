import axios from 'axios';

export const getTranslations = async (sourceText:string, sourceLang:string, targetLang:string) => {

    return await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/translation`, {
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