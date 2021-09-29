export interface IURL {
  BACK_URL: string | undefined;
  SOCKET_URL: string | undefined;
}

export interface IConfig {
  backindex: number;
  socketindex: number;
  Env: string | undefined;
  Url: IURL;
  token: {
    name: string;
    header: string;
  };
  telegram: Array<{ token: string; id: number; tag: string }>;
  change: (type: ChangeType) => Promise<void>;
}

export enum ChangeType {
  BACK = "db",
  SOCKET = "socket",
}

export const config: IConfig = {
  backindex: 0,
  socketindex: 0,
  Env: process.env.NODE_ENV,
  token: {
    name: "token",
    header: "xxx-access-token",
  },
  Url: {
    BACK_URL: process.env.REACT_APP_BACK_URL?.split("||")[0],
    SOCKET_URL: process.env.REACT_APP_SOCKET_URL?.split("||")[0],
  },
  // TODO: 서버에서 전송받아야할 데이터
  telegram: [
    {
      token: "1913295520:AAEgaldmVD0-49CI5zCWxYKLHZEBS3UGdBs",
      id: 1910949493,
      tag: "IS-dizzy",
    },
  ],
  change: async (type: ChangeType) => {
    switch (type) {
      case ChangeType.BACK:
        config.backindex++;
        config.Url.BACK_URL =
          process.env.REACT_APP_BACK_URL?.split("||")[config.backindex];
        break;
      case ChangeType.SOCKET:
        config.socketindex++;
        config.Url.SOCKET_URL =
          process.env.REACT_APP_SOCKET_URL?.split("||")[config.socketindex];
        break;
    }
  },
};
