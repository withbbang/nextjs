/*********************************************************************************
 ***************** 확인 팝업과 useMutation 커스텀 훅을 이용하여 API 테스트 *****************
 ********************************************************************************/
import Title from "@/components/Title";
import styles from "./Test2.module.scss";
import { useQuery } from "@tanstack/react-query";
import { queryTest2ClientSide } from "@/api/test2";
import { useMutationCustomByConfirmPopupHook } from "@/utils/customHooks";

export default function Test2() {
  const { data: queryData } = useQuery(["test2"], queryTest2ClientSide);
  const { data: muataionData, useSetActiveConfirmPopup } =
    useMutationCustomByConfirmPopupHook({
      message: "Confirm Popup Test",
      url: "/api/post",
      successCb: () => console.log("called handleConfirmBtn"),
      cancelBtnCb: () => console.log("called handleCancelBtn"),
      failCb: () => console.log("error test"),
    });

  const handleClick = () => {
    useSetActiveConfirmPopup({ key: "value" });
  };

  return (
    <>
      <Title title={"Test2"} />
      <h1 className={styles.h1}>It is Test2 Page!</h1>
      <h2>{queryData && queryData.key}</h2>
      <h2>{muataionData && JSON.stringify(muataionData)}</h2>
      <button onClick={handleClick}>confirmPopup test btn</button>
    </>
  );
}
