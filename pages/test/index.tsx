import Title from "@/components/Title";
import styles from "./Test.module.scss";

function Test() {
  return (
    <>
      <Title title={"Test"} />
      <h1 className={styles.h1}>It is Test Page!</h1>
    </>
  );
}

export default Test;
