// getServerSideProps 안에서는 source destination이 먹히지 않으므로 경로 그대로 작성해야한다

// local에서는 브라우저에서 바로 source url로 요청할 경우 cors에러가 난다.
// 따라서 destination url로 우회하여 cors 에러를 방지한다.

module.exports = {
  async rewrites() {
    return [
      {
        source: "/test/bad",
        destination: "http://localhost:4000/test/good",
      },
      {
        source: "/api/:path*",
        destination: "http://localhost:4000/api/:path*",
      },
    ];
  },
};
