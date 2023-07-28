import { useQuery } from "@tanstack/react-query";
import { queryTest2ClientSide } from "@/pages/api/test2";
import Title from "@/components/Title";
import styles from "./Test2.module.scss";

export default function Test() {
  const { data, isError, isLoading } = useQuery(
    ["test2"],
    queryTest2ClientSide,
    {
      refetchOnWindowFocus: false, // 윈도우 클릭시 마다 데이터 리페칭 유무
      refetchOnMount: false, // 서버사이드로 데이터 페칭 후 클라이언트사이드로 데이터 재페칭 유무
      // staleTime: Infinity, // Infinity로 할시 서버사이드로 데이터 페칭 후 클라이언트사이드로 데이터 재페칭 유무
    }
  );

  return (
    <>
      {isLoading ? (
        "Loading..."
      ) : (
        <>
          <Title title={"Test2"} />
          <h1 className={styles.h1}>It is Test2 Page!</h1>
        </>
      )}
    </>
  );
}
