/*********************************************************************************
 *** getServerSideProps과 useQuery 및 커스텀 훅을 이용하여 서버에서 가져온 데이터 캐싱 테스트 ***
 ********************************************************************************/
import Title from "@/components/Title";
import styles from "./Test1.module.scss";
import { GetServerSideProps } from "next";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { queryTest1ServerSide } from "@/api/test1";
import { useTranslation } from "next-i18next";
import { useQueryCustomHook } from "@/utils/customHooks";

export default function Test1() {
  const { t } = useTranslation("translate");
  const query = useQueryCustomHook({
    keys: ["test1"],
    url: "/api/example",
  });

  return (
    <>
      <Title title={"Test1"} />
      <h1 className={styles.h1}>{t("h1")}</h1>
      <h1 className={styles.h1}>{query && query.key}</h1>
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
