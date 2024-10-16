import React, { useState } from 'react';
import styles from './trasnlation-input.module.css';

const TranslationInput: React.FC = () => {
  const [text, setText] = useState('');
  const [largeText, setLargeText] = useState('');

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLargeText(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Translation submitted: ${text}\nLarge Text: ${largeText}`);
    // Add your translation submission logic here
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <textarea
        value={largeText}
        onChange={handleTextareaChange}
        placeholder="Enter large text for translation"
        className={styles.textarea}
      />
      <button type="submit" className={styles.button}>Submit</button>
    </form>
  );
};

export default TranslationInput;