/*********************************************************************************
 ********************************** API 함수들 정의 *********************************
 ********************************************************************************/
import { handleThrowCustomErrorInAPI, handleThrowErrorInAPI } from "./utils";

/**
 * [GET API]
 *
 * @param {string} url 요청 URL
 * @param {Function | undefined} failCb API 실패시 바로 실행하는 콜백
 * @param {Function | undefined} errorPopupBtnCb 에러팝업 버튼 콜백
 * @returns {Promise<any>}
 */
function getAPI(
  url: string,
  failCb?: () => any,
  errorPopupBtnCb?: () => any
): Promise<any> {
  return new Promise((resolve, reject) => {
    console.debug("URL: ", url);
    fetch(url, {
      method: "GET",
      //   mode: "no-cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status < 400) {
          return response.json();
        }

        return handleThrowErrorInAPI({
          status: response.status,
          failCb,
          errorPopupBtnCb,
        });
      })
      .then((result) => {
        console.debug("result: ", result);
        const { code, message } = result;

        if (code !== "0000")
          handleThrowCustomErrorInAPI({
            code,
            message,
            failCb,
            errorPopupBtnCb,
          });

        resolve(result);
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
}

/**
 * POST API
 * @param {string} url 요청 URL
 * @param {any} payload 요청 DATA
 * @param {Function | undefined} failCb API 실패시 바로 실행하는 콜백
 * @returns {Promise<any>}
 */
function postAPI(url: string, payload: any, failCb?: () => any): Promise<any> {
  console.debug("URL: ", url);
  console.debug("parameters: ", payload);
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "POST",
      //   mode: "no-cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (response.status < 400) {
          return response.json();
        }

        return handleThrowErrorInAPI({ status: response.status, failCb });
      })
      .then((result) => {
        console.debug("result: ", result);
        const { code, message } = result;

        if (code !== "0000")
          handleThrowCustomErrorInAPI({ code, message, failCb });

        resolve(result);
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
}

/**
 * PUT API
 * @param {string} url 요청 URL
 * @param {any} payload 요청 DATA
 * @param {Function | undefined} failCb API 실패시 바로 실행하는 콜백
 * @returns {Promise<any>}
 */
function putAPI(url: string, payload: any, failCb?: () => any): Promise<any> {
  console.debug("URL: ", url);
  console.debug("parameters: ", payload);
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "PUT",
      //   mode: "no-cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (response.status < 400) {
          return response.json();
        }

        return handleThrowErrorInAPI({ status: response.status, failCb });
      })
      .then((result) => {
        console.debug("result: ", result);
        const { code, message } = result;

        if (code !== "0000")
          handleThrowCustomErrorInAPI({ code, message, failCb });

        resolve(result);
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
}

/**
 * DELETE API
 * @param {string} url 요청 URL
 * @param {any} payload 요청 DATA
 * @param {Function | undefined} failCb API 실패시 바로 실행하는 콜백
 * @returns {Promise<any>}
 */
function deleteAPI(
  url: string,
  payload: any,
  failCb?: () => any
): Promise<any> {
  console.debug("URL: ", url);
  console.debug("parameters: ", payload);
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "DELETE",
      //   mode: "no-cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (response.status < 400) {
          return response.json();
        }

        return handleThrowErrorInAPI({ status: response.status, failCb });
      })
      .then((result) => {
        console.debug("result: ", result);
        const { code, message } = result;

        if (code !== "0000")
          handleThrowCustomErrorInAPI({ code, message, failCb });

        resolve(result);
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
}

/**
 * 이미지 업로드용 API
 * @param {string} url 요청 URL
 * @param {any} payload 요청 DATA
 * @param {Function | undefined} failCb API 실패시 바로 실행하는 콜백
 * @returns {Promise<any>}
 */
function imageAPI(url: string, payload: any, failCb?: () => any): Promise<any> {
  console.debug("URL: ", url);
  console.debug("parameters: ", payload.get("image"));
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: payload,
    })
      .then((response) => {
        if (response.status < 400) {
          return response.json();
        }

        return handleThrowErrorInAPI({ status: response.status, failCb });
      })
      .then((result) => {
        console.debug("result: ", result);
        const { code, message } = result;

        if (code !== "0000")
          handleThrowCustomErrorInAPI({ code, message, failCb });

        resolve(result);
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
}

export { getAPI, postAPI, putAPI, deleteAPI, imageAPI };
