import React from "react";
import { useCommonStore } from "@/stores/common";
import styles from "./ConfirmPopup.module.scss";

function ConfirmPopup(): JSX.Element {
  const { message, isConfirmPopupActive, confirmBtnCb, cancelBtnCb } =
    useCommonStore();

  return (
    <div
      className={
        isConfirmPopupActive
          ? styles.background
          : [styles.background, styles.none].join(" ")
      }
    >
      <div className={styles.modalBody}>
        <span>{message}</span>
        <div>
          <button onClick={cancelBtnCb}>Cancel</button>
          <button onClick={confirmBtnCb}>OK</button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmPopup;
