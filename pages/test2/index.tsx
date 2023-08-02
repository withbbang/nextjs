import Title from "@/components/Title";
import styles from "./Test2.module.scss";
import { useQuery } from "@tanstack/react-query";
import { queryTest2ClientSide } from "@/api/test2";
import { useCommonStore } from "@/stores/common";
import { useEffect } from "react";

export default function Test2() {
  const { setLoading } = useCommonStore();
  const { data, isError, isLoading, isSuccess } = useQuery(
    ["test2"],
    queryTest2ClientSide
  );

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  return (
    <>
      <Title title={"Test2"} />
      <h1 className={styles.h1}>It is Test2 Page!</h1>
      <h2>{isSuccess && data.key}</h2>
    </>
  );
}
