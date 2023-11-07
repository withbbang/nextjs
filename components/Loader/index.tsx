import React from "react";
import { useCommonStore } from "@/stores/common";
import { useIsFetching } from "@tanstack/react-query";
import styles from "./Loader.module.scss";

function Loader(): JSX.Element {
  const { isLoading } = useCommonStore();
  const isFetching = useIsFetching();

  return (
    <div
      className={
        isFetching || isLoading
          ? styles.background
          : [styles.background, styles.none].join(" ")
      }
    >
      <span className={styles.loader}></span>
    </div>
  );
}

export default Loader;
