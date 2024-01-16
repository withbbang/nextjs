import React from "react";
import { useCommonStore } from "@/stores/common";
import styles from "./ErrorPopup.module.scss";

function ErrorPopup(): JSX.Element {
  const { errorPopupMessage, isErrorPopupActive, errorBtnCb } =
    useCommonStore();

  return (
    <div
      className={
        isErrorPopupActive
          ? styles.background
          : [styles.background, styles.none].join(" ")
      }
    >
      <div className={styles.modalBody}>
        <span>{errorPopupMessage}</span>
        <div>
          <button onClick={errorBtnCb}>OK</button>
        </div>
      </div>
    </div>
  );
}

export default ErrorPopup;
