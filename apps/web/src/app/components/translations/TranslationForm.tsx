import React, { useEffect, useState } from 'react';
import styles from './TranslationForm.module.css';
import { getTranslations } from '../../services/TranslationApi';
import { LanguageSelectorContainer } from './LanguageSelectorContainer';
import { chatApi } from '../../services/chatApi';
import { error } from 'console';
import { Button } from '@repo/ui/button';
import { text } from 'stream/consumers';

const TranslationForm: React.FC = () => {
  const [translatedText, setTranslatedText] = useState('');
  const [sourceText, setSourceText] = useState('');
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('fr');

  const handleMsg = (msg:any) => { console.log(msg) }
  const handleError = (error: string) => { console.error(error) }
  const handleNotification = (notification: any) => { console.log(notification) }
  const handleTranslation = (translation: any) => { 
    console.log(translation);
    setTranslatedText(translation.translation)
  }
  
  const connectionParams = {
    userId: 'connectedUser',
    roomId: 'connectedRoom',
    messageHandler: handleMsg,
    notificationHandler: handleNotification,
    translateHandler: handleTranslation,
    errorHandler: handleError
  }

  useEffect(() => {
    //handleconnect();
  }, []);


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
    chatApi.sendTranslation(sourceText, sourceLang, targetLang, handleError);

  }, [sourceText, sourceLang, targetLang]);

  const handleSend = () => {
    chatApi.sendMessage(sourceText, handleError);
  }

  const handleconnect = () => {
    chatApi.connect(connectionParams);
  }

  const handleSourceLangChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSourceLang(e.target.value);
    chatApi.sendMessage('new source language: '+e.target.value, handleError);
  };

  const handleTargetLangChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTargetLang(e.target.value);
    chatApi.sendMessage('new target language: '+e.target.value, handleError);

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
      <button onClick={handleconnect}>Connect</button>
      <button onClick={handleSend}>Send</button>
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
