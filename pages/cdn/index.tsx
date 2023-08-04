import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import Title from "@/components/Title";
import styles from "./CDN.module.scss";

const Map = dynamic(() => import("../../components/Map"), { ssr: false });

export default function CDN() {
  useEffect(() => {
    const script = document.createElement("script");
    script.setAttribute(
      "src",
      "https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=clientId"
    );
    document.head.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <Title title={"CDN"} />
      <Map />
    </>
  );
}
