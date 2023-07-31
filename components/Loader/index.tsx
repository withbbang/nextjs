import React from "react";
import styles from "./Loader.module.scss";
import { useCommonStore } from "@/stores/common";

function Loader(): JSX.Element {
  const { loading } = useCommonStore();

  return (
    <div
      className={
        loading ? styles.background : [styles.background, styles.none].join(" ")
      }
    >
      <span className={styles.loader}></span>
    </div>
  );
}

export default Loader;
