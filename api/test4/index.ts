import { getAPI, postAPI, putAPI, deleteAPI } from "@/utils/apis";

export function queryTest4ClientSide() {
  return getAPI("/api/example");
}

export function queryTest4ServerSide() {
  return getAPI("http://localhost:4000/api/example");
}
