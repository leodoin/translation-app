"use client";

import Image from "next/image";
import { Button } from "@repo/ui/button";
import styles from "./page.module.css";
import TranslationInput from "./components/translation-input/translation-input"; // Import the new component



export default function Page() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <TranslationInput />
      </main>
    </div>
  );
}