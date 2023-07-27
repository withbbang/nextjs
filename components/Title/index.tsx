import Head from "next/head";

function Title({ title }: TitleProps) {
  return (
    <Head>
      <title>{title || "Next JS Boilerplate"}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/logo.svg" />
    </Head>
  );
}

export default Title;

interface TitleProps {
  title?: string;
}
