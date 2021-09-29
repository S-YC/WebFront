import io, { Socket } from "socket.io-client";
import { ChangeType, config } from "../../config/config";
import store from "../configureStore";
import { CONNECTED } from "../modules/soket/soketR";

let socket: Socket = io(config.Url.SOCKET_URL as string, {
  autoConnect: false,
});

socket.on("connect_error", () => {
  console.log("error connect socket", config.Url.SOCKET_URL);
  config.change(ChangeType.SOCKET);
  socket = io(config.Url.SOCKET_URL as string, {
    autoConnect: false,
  });
  connect();
});

/**
 * 소켓 연결후 고유 키값 받아오기
 */
socket.on("connected", async (data: string) => {
  store.dispatch({ type: CONNECTED, payload: data });
});

/**
 * 소켓 연결
 */
export const connect: () => void = async () => {
  // 소켓 연결시 인증 토큰 추가
  const auth: { [key: string]: string } = {
    [config.token.header]: sessionStorage.getItem(config.token.name) as string,
  };
  socket.auth = auth;
  socket.connect();
};
/**
 * 소켓 연결 끊기
 */
export const disconnect: () => void = async () => {
  socket.disconnect();
};
