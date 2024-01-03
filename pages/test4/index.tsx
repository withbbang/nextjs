/*********************************************************************************
 ***** getServerSideProps과 get API를 이용하여 서버에서 가져온 데이터 바로 내려주기 테스트 *****
 ********************************************************************************/
import Title from "@/components/Title";
import styles from "./Test4.module.scss";
import { GetServerSideProps } from "next";
import { getAPI } from "@/utils/apis";

export default function Test4({ data }: any) {
  return (
    <>
      <Title title={"Test4"} />
      <h1 className={styles.h1}>{data.key}</h1>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const SERVER_DOMAIN = process.env.NEXT_PUBLICK_SERVER_DOMAIN;
  // const data = await getAPI(`${SERVER_DOMAIN}/api/example`);

  return {
    redirect: {
      permanent: false, // permanent 설명: https://velog.io/@himprover/Nextjs-Redirect-%EC%98%B5%EC%85%98%EC%97%90-Permanent%EB%8A%94-%EB%AD%90%EC%A7%80
      destination: "/test2",
    },
    // props: { data },
  };
};
