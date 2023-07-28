import { getAPI, postAPI, putAPI, deleteAPI } from "@/utils/apis";

export async function queryTest3ClientSide() {
  return await getAPI("/api/example");
}

export async function queryTest3ServerSide() {
  return await getAPI("http://localhost:4000/api/example");
}

export async function mutationTest(params: any) {
  return await postAPI("/api/post", params);
}
