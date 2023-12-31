/******************************************************************************************************************
 ********************************* 카카오톡 인앱 브라우저에서 강제로 기본 브라우저 띄우는 스크립트 ********************************
 *****************************************************************************************************************/
document.addEventListener("DOMContentLoaded", function () {
  /* Do things after DOM has fully loaded */
  // function handleCurrentURLCopyToClipboard(url) {
  //   const t = document.createElement("textarea");
  //   document.body.appendChild(t);
  //   t.value = val;
  //   t.select();
  //   document.execCommand("copy");
  //   document.body.removeChild(t);
  // }

  // function handleEscapeInAppBrowser() {
  //   handleCurrentURLCopyToClipboard(window.location.href);
  //   alert(
  //     'URL주소가 복사되었습니다.\n\nSafari가 열리면 주소창을 길게 터치한 뒤, "붙여놓기 및 이동"를 누르면 정상적으로 이용하실 수 있습니다.'
  //   );
  //   location.href = "x-web-search://?";
  // }

  const userAgent = navigator.userAgent.toLowerCase();
  const targetUrl = location.href;

  if (userAgent.match(/kakaotalk/i)) {
    // 카카오톡 외부브라우저로 호출
    location.href =
      "kakaotalk://web/openExternal?url=" + encodeURIComponent(targetUrl);
  }
  // else if (userAgent.match(/line/i)) {
  //   // 라인 외부브라우저로 호출
  //   if (targetUrl.indexOf('?') !== -1) {
  //     location.href = targetUrl + '&openExternalBrowser=1';
  //   } else {
  //     location.href = targetUrl + '?openExternalBrowser=1';
  //   }
  // } else if (
  //   userAgent.match(
  //     /inapp|naver|snapchat|wirtschaftswoche|thunderbird|instagram|everytimeapp|whatsApp|electron|wadiz|aliapp|zumapp|iphone(.*)whale|android(.*)whale|kakaostory|band|twitter|DaumApps|DaumDevice\/mobile|FB_IAB|FB4A|FBAN|FBIOS|FBSS|trill|SamsungBrowser\/[^1]/i
  //   )
  // ) {
  //   // 그외 다른 인앱들
  //   if (userAgent.match(/iphone|ipad|ipod/i)) {
  //     // 아이폰은 강제로 사파리를 실행할 수 없다 ㅠㅠ
  //     // 모바일 대응 뷰 포트 강제설정
  //     const mobile = document.createElement('meta');
  //     mobile.name = 'viewport';
  //     mobile.content =
  //       'width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=no, minimal-ui';
  //     document.getElementsByTagName('head')[0].appendChild(mobile);
  //   } else {
  //     // 안드로이드는 Chrome이 설치되어있음으로 강제로 스킴을 실행한다.
  //     location.href =
  //       'intent://' +
  //       targetUrl.replace(/https?:\/\//i, '') +
  //       '#Intent;scheme=http;package=com.android.chrome;end';
  //   }
  // }
});
