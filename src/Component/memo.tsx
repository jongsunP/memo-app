"use client";

import { useEffect, useState } from "react";
import styles from "./memo.module.css";

const Memo = () => {
  const [memo, setMemo] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMemo(e.target.value);
  };

  const handleSave = () => {
    localStorage.setItem("memo", memo);
  };

  useEffect(() => {
    const memo = localStorage.getItem("memo");
    if (memo) {
      setMemo(memo);
    }
  }, []);

  return (
    <div className={styles.memoContainer}>
      Memo
      <textarea
        className={styles.textarea}
        onChange={handleChange}
        value={memo}
      />
      <button className={styles.button} onClick={handleSave}>
        Save
      </button>
    </div>
  );
};

export default Memo;
