import { getAPI, postAPI, putAPI, deleteAPI } from "@/utils/apis";

export function queryTest2ClientSide() {
  return getAPI("/api/example");
}

export function queryTest2ServerSide() {
  return getAPI("http://localhost:4000/api/example");
}
