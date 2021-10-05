import { AsyncThunk, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { RootState } from "..";
// import gaMatchimg from "../../../images/main/gp_main_img_01.png";
import Http, { IRes } from "../../net/Http";

/* 게임대회 data interface */
export interface IMatchitem {
  id: number /* DB index */;
  src?: string;
  mainText: string;
  money: string;
  buttonText: string;
  buttonlink: string;
}

/* 게임판TV UI interface */
export interface IChnnelitem {
  id: number;
  src?: string;
  mainText: string;
  chnnelName: string;
  chnnelView: number;
}

const name = "main";

export interface IMain {
  MatchList: Array<IMatchitem> | undefined;
  chnnelList: Array<IChnnelitem>;
}

export interface IResMatchList {
  list: Array<IMatchitem>;
}

export const fetchMatchList: AsyncThunk<
  IRes<Array<IMatchitem>>,
  void,
  { state: RootState }
> = createAsyncThunk<IRes<Array<IMatchitem>>, void, { state: RootState }>(
  `${name}/fetchMatchList`,
  async (_, thunkApi) => {
    try {
      return MatchList();
    } catch (err) {
      // 통신 실패 처리
      return thunkApi.rejectWithValue(err);
    }
  }
);

export const MatchList: () => Promise<IRes<Array<IMatchitem>>> =
  async (): Promise<IRes<Array<IMatchitem>>> => {
    const res: AxiosResponse<IRes<Array<IMatchitem>>> = await Http.get(
      "/main/matchlist"
    );
    return res.data;
  };

export interface IResChnnelList {
  list: Array<IChnnelitem>;
}

export const fetchChnnelList: AsyncThunk<
  IRes<Array<IChnnelitem>>,
  void,
  { state: RootState }
> = createAsyncThunk<IRes<Array<IChnnelitem>>, void, { state: RootState }>(
  `${name}/fetchChnnelList`,
  async (_, thunkApi) => {
    try {
      return channelList();
    } catch (err) {
      // 통신 실패 처리
      return thunkApi.rejectWithValue(err);
    }
  }
);

export const channelList: () => Promise<IRes<Array<IChnnelitem>>> =
  async (): Promise<IRes<Array<IChnnelitem>>> => {
    const res: AxiosResponse<IRes<Array<IChnnelitem>>> = await Http.get(
      "/main/channellist"
    );
    return res.data;
  };

const mainSlice = createSlice({
  name,
  initialState: {
    MatchList: undefined,
    chnnelList: undefined,
  } as unknown as IMain,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // getMainList(state: IMain, action: PayloadAction<void>) {
    //   return {
    //     ...state,
    //     MatchList: IMatchitemList,
    //     chnnelList: IChnnelItemList,
    //   };
    // },
  },
  extraReducers: builder => {
    // pending 액션을 통해 상태를 변화 시키기 위한 등록
    // 서버 통신하기전 호출되는 함수
    builder.addCase(fetchMatchList.pending, (state: IMain) => {
      return { ...state };
    });
    builder.addCase(fetchChnnelList.pending, (state: IMain) => {
      return { ...state };
    });
    // fulfilled 액션을 통해 상태를 변화 시키기 위한 등록
    // 서버 통신후 성공 하면 호출되는 함수
    builder.addCase(fetchMatchList.fulfilled, (state: IMain, { payload }) => {
      if (payload.result) {
        const list: Array<IMatchitem> = payload.data as Array<IMatchitem>;
        list.forEach(item => {
          // item.src = gaMatchimg;
          item.src = "/img/gp_main_img_01.png";
        });
        return {
          ...state,
          MatchList: list,
        };
        // Http.defaults.headers["localStorage"] = localStorage.getItem("token");
      } else {
        console.log(payload.data);
      }
    });
    builder.addCase(fetchChnnelList.fulfilled, (state: IMain, { payload }) => {
      if (payload.result) {
        const list: Array<IChnnelitem> = payload.data as Array<IChnnelitem>;
        list.forEach(item => {
          // item.src = gaChnnelImg;
          item.src = "/img/TV_chnnel.png";
        });
        return {
          ...state,
          chnnelList: list,
        };
        // Http.defaults.headers["localStorage"] = localStorage.getItem("token");
      } else {
        console.log(payload.data);
      }
    });
    // rejected 액션을 통해 상태를 변화 시키기 위한 등록
    // 서버 통신이 실패 했을때 호출되는 함수
    builder.addCase(fetchMatchList.rejected, (state: IMain, action) => {
      console.log("실패", state, action);
    });
    builder.addCase(fetchChnnelList.rejected, (state: IMain, action) => {
      console.log("실패", state, action);
    });
  },
});

// export const { getMainList } = mainSlice.actions;
export default mainSlice.reducer;
