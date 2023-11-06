import React from "react";
import { useCommonStore } from "@/stores/common";
import styles from "./Loader.module.scss";

function Loader(): JSX.Element {
  const { isLoading } = useCommonStore();

  return (
    <div
      className={
        isLoading
          ? styles.background
          : [styles.background, styles.none].join(" ")
      }
    >
      <span className={styles.loader}></span>
    </div>
  );
}

export default Loader;
