import React, { useState } from 'react';
import styles from './trasnlation-input.module.css';

const TranslationInput: React.FC = () => {
  const [text, setText] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Translation submitted: ${text}`);
    // Add your translation submission logic here
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        value={text}
        onChange={handleChange}
        placeholder="Enter text for translation"
        className={styles.input}
      />
      <button type="submit" className={styles.button}>Submit</button>
    </form>
  );
};

export default TranslationInput;