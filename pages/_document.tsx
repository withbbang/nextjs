import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        {/* 모든 페이지에 여기서 선언한 메타 태그가 head에 들어감, 루트파일이기에 가능한 적은 코드만 넣어야함  */}
        <script defer src="/force-to-move-browser.js" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
