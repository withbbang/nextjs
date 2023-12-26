/*********************************************************************************
 *************************** useMutation 커스텀 훅 테스트 ***************************
 ********************************************************************************/
import Title from "@/components/Title";
import styles from "./Test3.module.scss";
import { useMutationCustomHook, useQueryCustomHook } from "@/utils/customHooks";
import { ChangeEvent, useState } from "react";
import { imageAPI } from "@/utils/apis";

export default function Test3() {
  const query = useQueryCustomHook({
    keys: ["test3"],
    url: "/api/example",
    failCb: () => console.warn("called failCb"),
    errorPopupBtnCb: () => console.warn("called errorPopupBtnCb"),
  });
  const { data, mutate } = useMutationCustomHook({
    url: "/api/post",
  });
  const [image, setImage] = useState<File | null>(null);

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0];
    console.log("Selected File:", selectedFile);
    setImage(selectedFile);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    console.log("Image State:", image);

    if (image) formData.append("image", image);
    formData.append("otherValue", "tetsttststst");

    await imageAPI("/api/post", formData);
  };

  return (
    <>
      <Title title={"Test3"} />
      <h1 className={styles.h1}>It is Test3 Page!</h1>
      <button onClick={handleSubmit}>click!</button>
      <p>{query && JSON.stringify(query)}</p>
      <p>{data && JSON.stringify(data)}</p>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => handleChangeImage(e)}
      />
    </>
  );
}
