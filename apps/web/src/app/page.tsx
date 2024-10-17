"use client";

import styles from "./page.module.css";
import TranslationInput from "./components/translation-input";



export default function Page() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <TranslationInput />
      </main>
    </div>
  );
}