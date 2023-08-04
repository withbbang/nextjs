import { useEffect, useRef } from "react";
import styles from "./Map.module.scss";

export default function Map() {
  const mapRef = useRef<HTMLDivElement>(null);

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
      <div className={styles.map} id="map" ref={mapRef}></div>
    </>
  );
}
