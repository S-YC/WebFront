import { config } from "../../config/config";
import Http from "./Http";

/**
 * 텔레그램 봇에게 메시지 호출
 * @param message string
 */
const messageLog = async (message: string): Promise<void> => {
  config.telegram.forEach(t => {
    Http.get(`https://api.telegram.org/bot${t.token}/sendMessage`, {
      params: {
        chat_id: t.id,
        text: `[Client Front] {${process.env.NODE_ENV}} ${message}`,
      },
    });
  });
};

export default messageLog;
