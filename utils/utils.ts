import { useCommonStore } from "@/stores/common";

/**
 * catch 절 처리 모듈
 * @param {any} error 에러 객체
 * @param {function} cb 에러팝입 확인 버튼 추가 콜백함수
 */
export function handleSetCatchClause(error: any, cb?: () => void) {
  const { handleSetMessage, handleSetIsErrorPopupActive, handleSetErrorBtn } =
    useCommonStore();

  handleSetMessage(error.message);
  handleSetIsErrorPopupActive(true);
  handleSetErrorBtn(() => {
    handleSetIsErrorPopupActive(false);
    handleSetMessage("");
    cb?.();
  });
}
