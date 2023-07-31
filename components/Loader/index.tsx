import React from "react";
import styles from "./Loader.module.scss";
import { useCommonStore } from "@/stores/common";

function Loader(): JSX.Element {
  const { loading } = useCommonStore();

  return (
    <div className={styles.background}>
      <span className={styles.loader}></span>
    </div>
  );
}

export default Loader;
