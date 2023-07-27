import { getAPI, postAPI, putAPI, deleteAPI } from "../apis";

export async function queryTestClientSide() {
  return await getAPI("/api/example");
}

export async function queryTestServerSide() {
    return await getAPI("http://localhost:5000/example");
  }
  