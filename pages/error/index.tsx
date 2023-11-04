import Title from "@/components/Title";
import { GetServerSideProps } from "next";
import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query";
import { queryError1ClientSide, queryError1ServerSide } from "@/api/error";
import { useCommonStore } from "@/stores/common";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Test1() {
  const router = useRouter();
  const { setLoading } = useCommonStore();
  const { data, isError, isLoading } = useQuery(
    ["error1"],
    queryError1ClientSide,
    {
      refetchOnWindowFocus: false, // 윈도우 클릭시 마다 데이터 리페칭 유무
      // refetchOnMount: false, // 서버사이드로 데이터 페칭 후 클라이언트사이드로 데이터 재페칭 유무
      // staleTime: Infinity, // Infinity로 할시 서버사이드로 데이터 페칭 후 클라이언트사이드로 데이터 재페칭 유무
    }
  );

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  if (isError) {
    router.push("/not-found");
  } else {
    return (
      <>
        <Title title={"Error1"} />
      </>
    );
  }
}

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["error1"], queryError1ServerSide);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
