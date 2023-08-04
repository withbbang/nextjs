import { useEffect } from "react";
import Script from "next/script";
import Title from "@/components/Title";
import styles from "./CDN.module.scss";

export default function CDN() {
  useEffect(() => {
    const map = new naver.maps.Map("map", {
      center: new naver.maps.LatLng(37.3595704, 127.105399),
      mapTypes: new naver.maps.MapTypeRegistry({
        normal: naver.maps.NaverStyleMapTypeOptions.getVectorMap(),
      }),
    });
  }, []);

  return (
    <>
      <Title title={"CDN"} />
      <Script
        strategy="beforeInteractive"
        defer
        src="https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=clientId"
      />
      <div className={styles.map} id="map"></div>
    </>
  );
}
