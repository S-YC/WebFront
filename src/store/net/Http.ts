import axios, { AxiosInstance } from "axios";
import { ChangeType, config } from "../../config/config";

/**
 * axios 생성
 */
const Http: AxiosInstance = axios.create({
  baseURL: config.Url.BACK_URL,
  headers: {
    enctype: "multipart/form-data",
  },
});

export const hasConnection = async (): Promise<void> => {
  try {
    await Http.get("/");
    console.log("success connection back", config.Url.BACK_URL);
  } catch (err) {
    console.log("error connection back", config.Url.BACK_URL);
    config.change(ChangeType.BACK);
    console.log(Http.defaults.baseURL);
    Http.defaults.baseURL = config.Url.BACK_URL;
    console.log(Http.defaults.baseURL);
    hasConnection();
  }
};
hasConnection();

/**
 * 서버에서 반환되는 JSON 값 설정
 */
export interface IRes<T> {
  result: boolean;
  data?: T;
  error?: null | IResError;
  // TODO: 아직 확인되지 않음
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  meta?: any;
}

export interface IResError {
  code: number;
  message: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: any;
}

export default Http;
