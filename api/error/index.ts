import { getAPI } from "@/utils/apis";

export function queryError1ClientSide() {
  return getAPI("/api/500/error");
}

export function queryError1ServerSide() {
  return getAPI("http://localhost:4000/api/500/error");
}
