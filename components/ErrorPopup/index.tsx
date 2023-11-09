import React from "react";
import { useCommonStore } from "@/stores/common";
import styles from "./ErrorPopup.module.scss";

function ErrorPopup(): JSX.Element {
  const { message, isErrorPopupActive, handleErrorBtn } = useCommonStore();

  return (
    <div
      className={
        isErrorPopupActive
          ? styles.background
          : [styles.background, styles.none].join(" ")
      }
    >
      <div className={styles.modalBody}>
        <span>{message}</span>
        <div>
          <button onClick={handleErrorBtn}>OK</button>
        </div>
      </div>
    </div>
  );
}

export default ErrorPopup;
