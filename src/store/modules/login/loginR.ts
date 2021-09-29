import {
  AsyncThunk,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { RootState } from "..";
import Http, { IRes } from "../../net/Http";

// 이름 설정
const name = "login";
/**
 * 저장될 유저 정보 인터페이스 설정
 */
export interface ILogin {
  reqId: string;
  id?: string;
  uname?: string;
}
/**
 * 서버 통신 시 회원가입 정보
 */
export interface IUserFetc {
  email: string;
  pwd: string;
  nickname: string;
  agmkEmail: boolean;
  agmkSmsLms: boolean;
}

export interface IResSign {
  token: string;
  key: string;
}

/**
 * 비동기 함수를 생성 pending, fulfilled, rejected 를 실행되게
 */
export const fetchSign: AsyncThunk<
  IRes<IResSign>,
  IUserFetc,
  { state: RootState }
> = createAsyncThunk<IRes<IResSign>, IUserFetc, { state: RootState }>(
  `${name}/fetchSign`,
  async (params: IUserFetc, thunkApi) => {
    try {
      return sign(params);
    } catch (err) {
      // 통신 실패 처리
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      return thunkApi.rejectWithValue(err);
    }
  }
);
/**
 * SSR 일때 통신하기 위한 함수
 * @param params IUserFetc
 * @returns
 */
export const sign: (param: IUserFetc) => Promise<IRes<IResSign>> = async (
  params: IUserFetc
): Promise<IRes<IResSign>> => {
  const res: AxiosResponse<IRes<IResSign>> = await Http.post(
    "/sign/signup",
    params
  );
  return res.data;
};

/**
 * 이메일 Select
//  */
export const fetchisEmailSelect: AsyncThunk<
  IRes<IResSign>,
  { email: string },
  { state: RootState }
> = createAsyncThunk<IRes<IResSign>, { email: string }, { state: RootState }>(
  `${name}/fetchIsEmail`,
  async (params: { email: string }, thunkApi) => {
    try {
      return isEmailSelect(params);
    } catch (err) {
      // 통신 실패 처리
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      return thunkApi.rejectWithValue(err);
    }
  }
);
export const isEmailSelect: (param: {
  email: string;
}) => Promise<IRes<IResSign>> = async (params: {
  email: string;
}): Promise<IRes<IResSign>> => {
  const res: AxiosResponse<IRes<IResSign>> = await Http.post(
    "/login/isEmailSelect",
    params
  );
  return res.data;
};

/**
 * 닉네임 중복검사
//  */
export const fetchIsnickName: AsyncThunk<
  IRes<IResSign>,
  { nickname: string },
  { state: RootState }
> = createAsyncThunk<
  IRes<IResSign>,
  { nickname: string },
  { state: RootState }
>(`${name}/fetchIsnickName`, async (params: { nickname: string }, thunkApi) => {
  try {
    return isnickName(params);
  } catch (err) {
    // 통신 실패 처리
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return thunkApi.rejectWithValue(err);
  }
});
export const isnickName: (param: {
  nickname: string;
}) => Promise<IRes<IResSign>> = async (params: {
  nickname: string;
}): Promise<IRes<IResSign>> => {
  const res: AxiosResponse<IRes<IResSign>> = await Http.post(
    "/sign/isnickName",
    params
  );
  return res.data;
};
// data 를 관리하는 reducer 설정
const userSlice = createSlice({
  name,
  initialState: { reqId: "", id: "" } as ILogin,
  reducers: {
    signAction(state: ILogin, action: PayloadAction<ILogin>) {
      return { ...state, ...action.payload };
    },
  },
  extraReducers: builder => {
    // pending 액션을 통해 상태를 변화 시키기 위한 등록
    // 서버 통신하기전 호출되는 함수
    // 회원가입
    builder.addCase(fetchSign.pending, (state: ILogin, action) => {
      return { ...state, reqId: action.meta.requestId };
    });
    // 이메일 중복검사
    builder.addCase(fetchisEmailSelect.pending, (state: ILogin, action) => {
      return { ...state, reqId: action.meta.requestId };
    });
    // 닉네임 중복검사
    builder.addCase(fetchIsnickName.pending, (state: ILogin, action) => {
      return { ...state, reqId: action.meta.requestId };
    });
    // fulfilled 액션을 통해 상태를 변화 시키기 위한 등록
    // 서버 통신후 성공 하면 호출되는 함수
    // 회원가입
    builder.addCase(fetchSign.fulfilled, (state: ILogin, { payload }) => {
      if (payload.result) {
        console.log(payload.result);
        return;
      } else {
        console.log(payload.data);
      }
    });
    // 이메일 Select
    builder.addCase(
      fetchisEmailSelect.fulfilled,
      (state: ILogin, { payload }) => {
        if (payload.result) {
          // console.log(payload);
          return;
        } else {
          console.log(payload.data);
        }
      }
    );
    // 닉네임 중복검사
    builder.addCase(fetchIsnickName.fulfilled, (state: ILogin, { payload }) => {
      if (payload.result) {
        // console.log(payload);
        return;
      } else {
        console.log(payload.data);
      }
    });
    // rejected 액션을 통해 상태를 변화 시키기 위한 등록
    // 서버 통신이 실패 했을때 호출되는 함수
    builder.addCase(fetchSign.rejected, (state: ILogin, action) => {
      console.log("실패", state, action);
    });
  },
});

/**
 * CSR 에서 쓰는 액션들
 */
export const { signAction } = userSlice.actions;
// data 를 관리하는 reducer 기본 반환 설정
export default userSlice.reducer;
