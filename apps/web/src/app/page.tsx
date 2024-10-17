"use client";

import styles from "./page.module.css";
import TranlationForm from "./components/translations/TranslationForm";



export default function Page() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <TranlationForm />
      </main>
    </div>
  );
}