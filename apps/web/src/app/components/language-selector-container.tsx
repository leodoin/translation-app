import React from 'react';
import { SelectorContainer } from './language-selector';
import styles from './language-selector-container.module.css';

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
        <SelectorContainer
          value={sourceLang}
          onChange={onSourceLangChange}
        />
      </label>
      <label>
        Target Language:
        <SelectorContainer
          value={targetLang}
          onChange={onTargetLangChange}
        />
      </label>
    </div>
  );
};