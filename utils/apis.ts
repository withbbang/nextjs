/*********************************************************************************
 ********************************** API 함수들 정의 *********************************
 ********************************************************************************/
import { handleThrowCustomErrorInAPI, handleThrowErrorInAPI } from "./utils";

/**
 * GET API
 * @param {string} url 요청 URL
 * @param {function | undefined} cb 에러팝업 콜백
 * @returns {Promise<any>}
 */
function getAPI(url: string, errorCb?: () => void): Promise<any> {
  return new Promise((resolve, reject) => {
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

        handleThrowErrorInAPI({ status: response.status, errorCb });
      })
      .then((result) => {
        console.debug("result: ", result);
        const { code, message } = result;

        if (code !== "0000")
          handleThrowCustomErrorInAPI({ code, message, errorCb });

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
 * @returns {Promise<any>}
 */
function postAPI(url: string, payload: any): Promise<any> {
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

        handleThrowErrorInAPI({ status: response.status });
      })
      .then((result) => {
        console.debug("result: ", result);
        const { code, message } = result;

        if (code !== "0000") handleThrowCustomErrorInAPI({ code, message });
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
 * @returns {Promise<any>}
 */
function putAPI(url: string, payload: any): Promise<any> {
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

        handleThrowErrorInAPI({ status: response.status });
      })
      .then((result) => {
        console.debug("result: ", result);
        const { code, message } = result;

        if (code !== "0000") handleThrowCustomErrorInAPI({ code, message });
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
 * @returns {Promise<any>}
 */
function deleteAPI(url: string, payload: any): Promise<any> {
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

        handleThrowErrorInAPI({ status: response.status });
      })
      .then((result) => {
        console.debug("result: ", result);
        const { code, message } = result;

        if (code !== "0000") handleThrowCustomErrorInAPI({ code, message });
        resolve(result);
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
}

export { getAPI, postAPI, putAPI, deleteAPI };
