import { GetServerSideProps } from "next";
import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query";
import { queryTestClientSide, queryTestServerSide } from "@/pages/api/test";
import { isProd } from "@/utils/common";
import Title from "@/components/Title";
import styles from "./Test.module.scss";

export default function Test() {
  const { data, isError, isLoading } = useQuery(["test"], queryTestClientSide, {
    refetchOnWindowFocus: false, // 윈도우 클릭시 마다 데이터 리페칭 유무
    refetchOnMount: false, // 서버사이드로 데이터 페칭 후 클라이언트사이드로 데이터 재페칭 유무
    // staleTime: Infinity, // Infinity로 할시 서버사이드로 데이터 페칭 후 클라이언트사이드로 데이터 재페칭 유무
  });

  return (
    <>
      {isLoading ? (
        "Loading..."
      ) : (
        <>
          <Title title={"Test"} />
          <h1 className={styles.h1}>It is Test Page!</h1>
        </>
      )}
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(
    ["test"],
    isProd ? queryTestClientSide : queryTestServerSide
  );
  return {
    props: {
      dehydratedProps: dehydrate(queryClient),
    },
  };
};
