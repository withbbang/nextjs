import { useMutation, useQuery } from "@tanstack/react-query";
import { queryTest3ClientSide, mutationTest } from "@/pages/api/test3";
import Title from "@/components/Title";
import styles from "./Test3.module.scss";

export default function Test3() {
  const { data, isError, isLoading } = useQuery(
    ["test3"],
    queryTest3ClientSide,
    {
      refetchOnWindowFocus: false, // 윈도우 클릭시 마다 데이터 리페칭 유무
      refetchOnMount: false, // 서버사이드로 데이터 페칭 후 클라이언트사이드로 데이터 재페칭 유무
      // staleTime: Infinity, // Infinity로 할시 서버사이드로 데이터 페칭 후 클라이언트사이드로 데이터 재페칭 유무
    }
  );

  const { mutate } = useMutation({
    mutationFn: mutationTest,
    onSuccess: (mutationResponse, partialConfigUpdate, context) => {
      console.log(mutationResponse);
    },
    onError: (err, partialConfigUpdate, context) => {
      console.error(err);
    },
    onSettled: (mutationResponse, err, partialConfigUpdate, context) => {
      console.debug(context);
    },
  });

  const handleClick = () => {
    mutate({ key: "value" });
  };

  return (
    <>
      {isLoading ? (
        "Loading..."
      ) : (
        <>
          <Title title={"Test3"} />
          <h1 className={styles.h1}>It is Test3 Page!</h1>
          <button onClick={handleClick}>click!</button>
        </>
      )}
    </>
  );
}
