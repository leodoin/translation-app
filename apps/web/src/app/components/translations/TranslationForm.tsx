import React, { useEffect, useState } from 'react';
import styles from './TranslationForm.module.css';
import { getTranslations } from '../../services/TranslationApi';
import { LanguageSelectorContainer } from './LanguageSelectorContainer';

const TranslationForm: React.FC = () => {
  const [translatedText, setTranslatedText] = useState('');
  const [sourceText, setSourceText] = useState('');
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('fr');



  const handleTextareaChange = async (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSourceText(e.target.value);
  };

  useEffect(() => {
    if (sourceText.trim() === '') {
      setTranslatedText('');
      return;
    }
    if (sourceLang === targetLang) {
      setTranslatedText(sourceText);
      return;
    }
    const fetchTranslation = async () => {
      const translation = await getTranslations(sourceText, sourceLang, targetLang);
      setTranslatedText(translation);
    };
    fetchTranslation();
  }, [sourceText, sourceLang, targetLang]);

  const handleSourceLangChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSourceLang(e.target.value);
  };

  const handleTargetLangChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTargetLang(e.target.value);
  };

  return (
    <div className={styles.translationForm}>
      <textarea
        value={sourceText}
        onChange={handleTextareaChange}
        placeholder="Enter text for translation"
        className={styles.textarea}
      />
      <LanguageSelectorContainer
        sourceLang={sourceLang}
        targetLang={targetLang}
        onSourceLangChange={handleSourceLangChange}
        onTargetLangChange={handleTargetLangChange}
      />
      <textarea
        value={translatedText}
        readOnly
        disabled
        placeholder="Translation will appear here"
        className={styles.textarea}
      />
    </div>
  );
};

export default TranslationForm;
