import Title from "@/components/Title";
import styles from "./Test1.module.scss";
import { GetServerSideProps } from "next";
import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { queryTest1ClientSide, queryTest1ServerSide } from "@/api/test1";
import { useTranslation } from "next-i18next";
import { useCommonStore } from "@/stores/common";
import { useEffect } from "react";

export default function Test1() {
  const { t } = useTranslation("translate");
  const { handleSetIsLoading } = useCommonStore();
  const { data, isError, isLoading } = useQuery(
    ["test1"],
    queryTest1ClientSide,
    {
      refetchOnWindowFocus: false, // 윈도우 클릭시 마다 데이터 리페칭 유무
      // refetchOnMount: false, // 서버사이드로 데이터 페칭 후 클라이언트사이드로 데이터 재페칭 유무
      // staleTime: Infinity, // Infinity로 할시 서버사이드로 데이터 페칭 후 클라이언트사이드로 데이터 재페칭 유무
    }
  );

  return (
    <>
      <Title title={"Test1"} />
      <h1 className={styles.h1}>{t("h1")}</h1>
      <h1 className={styles.h1}>{data.key}</h1>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["test1"], queryTest1ServerSide);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      ...(await serverSideTranslations(context.locale ?? "ko", ["translate"])),
    },
  };
};
