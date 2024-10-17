import { ChangeEvent } from "react";
import styles from './LanguageSelector.module.css';

interface LanguageSelectorProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

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

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ value, onChange }) => {

  const handleOnChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange(e);
  }
  
  return (
    <select value={value} onChange={handleOnChange} className={styles.select}>
      {languages.map((lang) => (
        <option className={styles.option} key={lang.code} value={lang.code}>
          {lang.name}
        </option>
      ))}
    </select>
  )
}

