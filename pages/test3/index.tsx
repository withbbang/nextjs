import Title from "@/components/Title";
import styles from "./Test3.module.scss";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryTest3ClientSide, mutationTest } from "@/api/test3";
import { useCommonStore } from "@/stores/common";
import { useEffect } from "react";
import { useMutationCustom } from "@/utils/customHooks";

export default function Test3() {
  const {
    handleSetIsLoading,
    handleSetMessage,
    handleSetIsErrorPopupActive,
    handleSetErrorBtn,
  } = useCommonStore();
  const query = useQuery(["test3"], queryTest3ClientSide);
  const { data, mutate } = useMutationCustom("/api/post", { key: "value" });

  const handleClick = () => {
    mutate();
  };

  return (
    <>
      <Title title={"Test3"} />
      <h1 className={styles.h1}>It is Test3 Page!</h1>
      <button onClick={handleClick}>click!</button>
    </>
  );
}
