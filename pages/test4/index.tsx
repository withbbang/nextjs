import { GetServerSideProps } from "next";
import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query";
import { queryTest4ClientSide, queryTest4ServerSide } from "@/api/test4";
import { isProd } from "@/utils/common";
import Title from "@/components/Title";
import styles from "./Test4.module.scss";
import { useEffect } from "react";
import { useCommonStore } from "@/stores/common";

export default function Test4() {
  const { setLoading } = useCommonStore();
  const { data, isError, isLoading, isSuccess } = useQuery(
    ["test4"],
    queryTest4ClientSide,
    {
      refetchOnWindowFocus: false, // 윈도우 클릭시 마다 데이터 리페칭 유무
      refetchOnMount: false, // 서버사이드로 데이터 페칭 후 클라이언트사이드로 데이터 재페칭 유무
      // staleTime: Infinity, // Infinity로 할시 서버사이드로 데이터 페칭 후 클라이언트사이드로 데이터 재페칭 유무
    }
  );

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  return (
    <>
      <Title title={"Test4"} />
      <h1 className={styles.h1}>It is Test4 Page!</h1>
      <h2>{isSuccess && data?.key}</h2>
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
      dehydratedState: dehydrate(queryClient),
    },
  };
};
