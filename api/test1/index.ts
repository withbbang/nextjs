import { getAPI, postAPI, putAPI, deleteAPI } from "@/utils/apis";

export function queryTest1ClientSide() {
  return getAPI("/api/example");
}

export function queryTest1ServerSide() {
  return getAPI("http://localhost:4000/api/example");
}
