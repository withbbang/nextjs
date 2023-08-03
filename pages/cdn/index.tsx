import Title from "@/components/Title";
import { useEffect } from "react";

export default function CDN() {
  useEffect(() => {
    const cdnUrl =
      "https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=clientId";
    const script = document.createElement("script");
    script.src = cdnUrl;
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup when the component is unmounted
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <Title title={"CDN"} />
      <h1>It is CDN Test Page!</h1>
      <div id="map"></div>
    </>
  );
}
