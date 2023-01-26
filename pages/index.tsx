import styles from "../styles/Home.module.css";
import SimpleCounter from "./SimpleCounter";

export default function Home() {
  return (
    <div className={styles.container}>
      <SimpleCounter title="Left 1" timeout={7 * 60 * 1000} />
      <SimpleCounter title="Right 1" timeout={7 * 60 * 1000} />
      <SimpleCounter title="Left 2" timeout={5 * 60 * 1000} />
      <SimpleCounter title="Right 2" timeout={5 * 60 * 1000} />
      <SimpleCounter title="Left 3" timeout={3 * 60 * 1000} />
      <SimpleCounter title="Right 3" timeout={3 * 60 * 1000} />
    </div>
  );
}
