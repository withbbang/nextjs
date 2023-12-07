/*********************************************************************************
 *************************** useMutation 커스텀 훅 테스트 ***************************
 ********************************************************************************/
import Title from "@/components/Title";
import styles from "./Test3.module.scss";
import { useMutationCustomHook, useQueryCustomHook } from "@/utils/customHooks";

export default function Test3() {
  const query = useQueryCustomHook({
    keys: ["test3"],
    url: "/api/example",
    failCb: () => console.warn("called failCb"),
    errorPopupBtnCb: () => console.warn("called errorPopupBtnCb"),
  });
  const { data, mutate } = useMutationCustomHook({
    url: "/api/post",
  });

  const handleClick = () => {
    mutate({ key: "value" });
  };

  return (
    <>
      <Title title={"Test3"} />
      <h1 className={styles.h1}>It is Test3 Page!</h1>
      <button onClick={handleClick}>click!</button>
      <p>{query && JSON.stringify(query)}</p>
      <p>{data && JSON.stringify(data)}</p>
    </>
  );
}
