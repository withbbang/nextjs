import { getAPI, postAPI, putAPI, deleteAPI } from "@/utils/apis";

export function queryTest3ClientSide() {
  return getAPI("/api/example");
}

export function queryTest3ServerSide() {
  return getAPI("http://localhost:4000/api/example");
}

export function mutationTest(params: any) {
  return postAPI("/api/post", params);
}
