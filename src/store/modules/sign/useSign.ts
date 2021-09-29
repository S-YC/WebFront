import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchIsEmail, fetchIsnickName, fetchSign, IUserFetc } from "./signR";
import { State } from "..";
import useLoading from "../loading/useLoading";
import { useHistory } from "react-router";
export interface IUseUserReturn {
  id: string;
  uname: string;
  isEmail: (email: string) => Promise<boolean>;
  isnickName: (nickname: string) => Promise<boolean>;
  sign: (data: IUserFetc) => Promise<boolean>;
  errorMessage?: string;
}

/**
 * user 정보 통신 훅 설정
 * @returns {id, uname, sign} as IUseUserReturn;
 */
const useSign = (): IUseUserReturn => {
  // 화면상에 표시될 값 설정
  const { id, uname } = useSelector((state: State) => state.user);
  const { alert, on, off } = useLoading();
  const dispatch = useDispatch();

  // 이메일(아이디) 중복확인 Action 함수
  const isEmail = useCallback(async (email: string): Promise<boolean> => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result: any = await dispatch(fetchIsEmail({ email }));

    if (result === undefined) {
      console.log("통신 오류가 발생하였습니다.");
      return false;
    }

    // CODE- 201 : 사용가능, 202 : 중복
    return new Promise((res, rej) => {
      try {
        if (result.payload.data.code === 201) {
          return res(false);
        } else if (result.payload.data.code === 202) {
          return res(true);
        } else {
          return res(true);
        }
      } catch (err) {
        return rej(err);
      }
    });
  }, []);

  // 닉네임 중복확인 Action 함수
  const isnickName = useCallback(async (nickname: string): Promise<boolean> => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result: any = await dispatch(fetchIsnickName({ nickname }));

    if (result === undefined) {
      console.log("통신 오류가 발생하였습니다.");
      return false;
    }

    // CODE- 201 : 사용가능, 202 : 중복
    return new Promise((res, rej) => {
      try {
        if (result.payload.data.code === 201) {
          return res(false);
        } else if (result.payload.data.code === 202) {
          return res(true);
        } else {
          return res(true);
        }
      } catch (err) {
        return rej(err);
      }
    });
  }, []);

  /* history 위치 : useSign 안에서만 동작 */
  const history = useHistory();
  /**
   * 로그인 Hook : fetchLogin 를 호출해서 pending, fulfilled, rejected 가 실행되게 처리
   */
  const sign: (data: IUserFetc) => Promise<boolean> = useCallback(
    async (data: IUserFetc): Promise<boolean> => {
      on();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const res: any = await dispatch(fetchSign(data));
      console.log(res);
      if (res.error === undefined && res.payload.result) {
        // 성공시 페이지 이동
        const SignPath = "/signSuccess";
        console.log(res.payload.data);
        alert(res.payload.data.message);
        history.push({
          pathname: SignPath,
          state: {
            email: res.payload.data.email,
            nickname: res.payload.data.nickname,
          },
        });
      } else {
        // 에러 처리
        if (res.payload.error != undefined) {
          alert(
            "에러코드 :" +
              res.payload.error.code +
              "\n" +
              res.payload.error.message
          );
        }
      }
      off();
      return false;
    },
    []
  );

  return { id, uname, sign, isEmail, isnickName } as IUseUserReturn;
};

export default useSign;
