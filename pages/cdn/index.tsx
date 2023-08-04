import Title from "@/components/Title";
import { useEffect } from "react";
import styles from "./CDN.module.scss";

export default function CDN() {
  useEffect(() => {
    const cdnUrl =
      "https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=clientId";
    const script = document.createElement("script");
    script.setAttribute("strategy", "beforeInteractive");
    script.setAttribute("src", cdnUrl);
    script.setAttribute("async", "true");
    document.body.appendChild(script);

    const map = new naver.maps.Map("map", {
      center: new naver.maps.LatLng(37.3595704, 127.105399),
      mapTypes: new naver.maps.MapTypeRegistry({
        normal: naver.maps.NaverStyleMapTypeOptions.getVectorMap(),
      }),
    });

    return () => {
      // Cleanup when the component is unmounted
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <Title title={"CDN"} />
      <div className={styles.map} id="map"></div>
    </>
  );
}
