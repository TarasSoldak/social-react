import axios from "axios";
import { UsersItemType } from "../redux/usersReducer";

export const instance = axios.create({
  withCredentials: true,
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  headers: {
    "API-KEY": "6a776457-e59e-482f-ba70-10ff93f7c513",
  },
});
export type ResponseDataType<D = {}> = {
  data: D
  resultCode: number
  messages: Array<string>

}
export type GetUsersType = {
  items: Array<UsersItemType>
  totalCount: number
  error: string | null
}
