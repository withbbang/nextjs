import Title from "@/components/Title";
import { useRouter } from "next/router";
import SVG from "@/utils/SVG";
import styles from "./404.module.scss";

export default function NotFoundPage() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <>
      <Title title={"Not Found Page"} />
      <div className={styles.wrap}>
        <div className={styles.backBtn}>
          <span onClick={handleBack}>
            <SVG type="back" width="30px" height="30px" />
          </span>
        </div>
        <div className={styles.innerWrap}>
          <h1>Sorry This Page Is Not Found</h1>
          <span>
            <SVG type="notFound" width="500px" height="500px" />
          </span>
        </div>
      </div>
    </>
  );
}
