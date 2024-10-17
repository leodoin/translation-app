import React from 'react';
import { LanguageSelector } from './LanguageSelector';
import styles from './LanguageSelectorContainer.module.css';

interface LanguageSelectorContainerProps {
  sourceLang: string;
  targetLang: string;
  onSourceLangChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onTargetLangChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const LanguageSelectorContainer: React.FC<LanguageSelectorContainerProps> = ({
  sourceLang,
  targetLang,
  onSourceLangChange,
  onTargetLangChange,
}) => {
  return (
    <div className={styles.selectorContainer}>
      <label>
        Source Language:
        <LanguageSelector
          value={sourceLang}
          onChange={onSourceLangChange}
        />
      </label>
      <label>
        Target Language:
        <LanguageSelector
          value={targetLang}
          onChange={onTargetLangChange}
        />
      </label>
    </div>
  );
};