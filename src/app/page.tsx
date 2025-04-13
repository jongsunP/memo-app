import Memo from "@/Component/memo";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <Memo />
    </div>
  );
}
