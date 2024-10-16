import React, { useState } from 'react';
import styles from './trasnlation-input.module.css';
import axios from 'axios';

const TranslationInput: React.FC = () => {
  const [translatedText, setText] = useState('');
  const [sourceText, setLargeText] = useState('');
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('fr');

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'fr', name: 'French' },
    { code: 'pt-br', name: 'Portuguese (Brazil)' },
    { code: 'de', name: 'German' },
    { code: 'ja', name: 'Japanese' },
    { code: 'ru', name: 'Russian' },
    { code: 'es', name: 'Spanish' },
    // Add more languages as needed
  ];

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLargeText(e.target.value);
  };

  const handleSourceLangChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSourceLang(e.target.value);
  };

  const handleTargetLangChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTargetLang(e.target.value);
  };

  const NEXT_PUBLIC_API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const getTranslations = async () => {

    const data = await axios.post(`${NEXT_PUBLIC_API_BASE_URL}/api/translation`, {
      text: sourceText,
      sourceLang,
      targetLang
    })
    .then((res) => res.data)
    .catch((error) => {console.error('Error:', error);});

    return data;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting translation:', sourceText);
    const { translation } = await getTranslations();
    console.log('Translation:', translation);
    setText(translation);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <textarea
        value={sourceText}
        onChange={handleTextareaChange}
        placeholder="Enter large text for translation"
        className={styles.textarea}
      />
      <div className={styles.selectorContainer}>
        <label>
          Source Language:
          <select value={sourceLang} onChange={handleSourceLangChange}>
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Target Language:
          <select value={targetLang} onChange={handleTargetLangChange}>
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </label>
        <button type="submit" className={styles.button}>Translate</button>
      </div>
      <textarea
        value={translatedText}
        readOnly
        disabled
        placeholder="Translation will appear here"
        className={styles.textarea}
      />
    </form>
  );
};

export default TranslationInput;