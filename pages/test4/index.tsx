import { GetServerSideProps } from "next";
import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query";
import { queryTest4ClientSide, queryTest4ServerSide } from "@/api/test4";
import { isProd } from "@/utils/common";
import Title from "@/components/Title";
import styles from "./Test4.module.scss";
import { useEffect } from "react";
import { useCommonStore } from "@/stores/common";

export default function Test4(props: any) {
  //FIXME: serverside로 내려온 데이터 바로 뿌려주기 기능 필요
  const { setLoading } = useCommonStore();
  const { data, isError, isLoading, isSuccess } = useQuery(
    ["test4"],
    queryTest4ClientSide
  );

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  return (
    <>
      <Title title={"Test4"} />
      <h1 className={styles.h1}>It is Test4 Page!</h1>
      <h2>{isSuccess && data.count}</h2>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(
    ["test4"],
    isProd ? queryTest4ClientSide : queryTest4ServerSide
  );
  return {
    props: {
      dehydratedProps: dehydrate(queryClient),
    },
  };
};
