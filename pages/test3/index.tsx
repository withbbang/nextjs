import Title from "@/components/Title";
import styles from "./Test3.module.scss";
import { useMutationCustom, useQueryCustom } from "@/utils/customHooks";

export default function Test3() {
  const query = useQueryCustom({
    keys: ["test3"],
    url: "/api/example",
    cb: () => console.log("heheehj"),
  });
  const { data, mutate } = useMutationCustom({
    url: "/api/post",
    params: { key: "value" },
  });

  const handleClick = () => {
    mutate();
  };

  return (
    <>
      <Title title={"Test3"} />
      <h1 className={styles.h1}>It is Test3 Page!</h1>
      <button onClick={handleClick}>click!</button>
      <p>{query && JSON.stringify(query)}</p>
      <p>{data && JSON.stringify(data)}</p>
    </>
  );
}
