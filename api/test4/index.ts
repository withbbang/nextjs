import { getAPI } from "@/utils/apis";

export function queryTest4ClientSide() {
  return getAPI("/api/example");
}

export function queryTest4ServerSide(param: string) {
  return getAPI(`http://localhost:4000/api/example?param=${param}`);
}
