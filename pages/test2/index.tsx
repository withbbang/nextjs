import Title from "@/components/Title";
import styles from "./Test2.module.scss";
import { useQuery } from "@tanstack/react-query";
import { queryTest2ClientSide } from "@/api/test2";
import { useCommonStore } from "@/stores/common";

export default function Test2() {
  const {
    handleSetMessage,
    handleSetIsConfirmPopupActive,
    handleSetConfirmBtn,
    handleSetCancelBtn,
  } = useCommonStore();
  const { data } = useQuery(["test2"], queryTest2ClientSide);

  const handleClick = () => {
    handleSetMessage("Confirm Popup Test");
    handleSetIsConfirmPopupActive(true);
    handleSetConfirmBtn(() => {
      console.log("called handleConfirmBtn");
      handleSetMessage("");
      handleSetIsConfirmPopupActive(false);
    });
    handleSetCancelBtn(() => {
      handleSetMessage("");
      handleSetIsConfirmPopupActive(false);
    });
  };

  return (
    <>
      <Title title={"Test2"} />
      <h1 className={styles.h1}>It is Test2 Page!</h1>
      <h2>{data && data.key}</h2>
      <button onClick={handleClick}>confirmPopup test btn</button>
    </>
  );
}
