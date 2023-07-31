import { getAPI, postAPI, putAPI, deleteAPI } from "@/utils/apis";

export async function queryTest2ClientSide() {
  return await getAPI("/api/example");
}

export async function queryTest2ServerSide() {
  return await getAPI("http://localhost:4000/api/example");
}
