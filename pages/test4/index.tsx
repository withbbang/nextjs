import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query";
import { queryTest4ClientSide, queryTest4ServerSide } from "@/api/test4";
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
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    }
  );

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  console.log(data);

  return (
    <>
      <Title title={"Test4"} />
      <h1 className={styles.h1}>It is Test4 Page!</h1>
      <h2>{isSuccess && data?.key}</h2>
    </>
  );
}

export async function getServerSideProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["test4"], queryTest4ServerSide);
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
