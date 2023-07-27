import { getAPI, postAPI, putAPI, deleteAPI } from "../apis";

export async function queryTest() {
  return await getAPI("/api/example");
}
