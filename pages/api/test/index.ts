import { getAPI, postAPI, putAPI, deleteAPI } from "@/utils/apis";

export async function queryTestClientSide() {
  return await getAPI("/api/example");
}

export async function queryTestServerSide() {
  return await getAPI("http://localhost:4000/api/example");
}
