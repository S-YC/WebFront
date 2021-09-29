import React, { RefObject, useEffect, useRef, useState } from "react";
import { Input } from "@material-ui/core";
import styled from "styled-components";
import {
  RowBox,
  CenterColumnBox,
  CenterRowBox,
  ColumnBox,
} from "../../styles/comon/layout";
import { css } from "styled-components";
import {
  emailRule,
  IUseInput,
  passwordRule,
  useInputRef,
} from "../../store/hook/useInput";
import useSign from "../../store/modules/sign/useSign";
import { IUserFetc } from "../../store/modules/sign/signR";
import { useHistory } from "react-router";
import {
  SLmainContainer,
  SLlogoContainer,
  SLlogoImg,
  SLMidContainer,
  SLMidSubContainer,
  SLMainText,
} from "../../styles/comon/signLogin/common";
import InputArea from "./sign_inputAreaC";

// 공통 Input 생성
const InputText = styled(Input)`
  opacity: 0.87;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: -0.65px;
  width: 100%;
`;

// 비밀번호 하단 TEXT
const PwdPlaceText = styled.span`
  font-size: 12px;
  font-weight: 500;
  letter-spacing: -0.6px;
  color: #9e9e9e;
  margin-top: 8px;
`;

//  우편번호 박스 영역
const PostArea = styled(RowBox)`
  margin-top: 22px;
`;
// 우편번호 찾기 영역
const PostButton = styled(CenterRowBox)`
  width: 180px;
  padding: 10px 24px 11px 25px;
  border-radius: 24px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.16);
  background-color: #f5921f;
  cursor: pointer;
`;

// 우편번호 찾기 TEXT
const PostText = styled.span`
  display: flex;
  flex-wrap: wrap;
  font-size: 13px;
  font-weight: 500;
  line-height: 0.95;
  letter-spacing: -0.65px;
  color: #fff;
`;

// input 양식 확인
const SignRule = styled.span<{ checked: boolean }>`
  margin-top: 8px;
  font-size: 12px;
  font-weight: 800;
  line-height: 1.03;
  letter-spacing: -0.6px;
  color: #f01a43;
  ${props => {
    if (props.checked) {
      return css`
        display: block;
      `;
    } else {
      return css`
        display: none;
      `;
    }
  }}
`;

// 회원가입 버튼 영역
const SignButtonArea = styled(CenterColumnBox)`
  margin-top: 48px;
`;

// 회원가입 버튼
const SignButton = styled.button<{ disabled: boolean }>`
  padding: 17px 130px;
  border-radius: 28px;
  border: none;
  cursor: pointer;
  ${props => {
    if (props.disabled) {
      return css`
        background-color: #f5f5f5;
        color: #c4c4c4;
      `;
    } else {
      return css`
        background-color: #141212;
        color: #fff;
      `;
    }
  }}
`;

// 회원가입 버튼 TEXT
const SignButtonText = styled.span`
  font-size: 15px;
  font-weight: normal;
  letter-spacing: -0.75px;
`;

// 회원가입 버튼 취소
const SignButtonCancel = styled.span`
  font-size: 13px;
  margin-top: 16px;
  font-weight: normal;
  cursor: pointer;
`;

const SignAgree: React.FC = () => {
  const { sign, isEmail, isnickName } = useSign();

  const history = useHistory<{ id: Array<number>; value: Array<boolean> }>();

  // 회원가입 처리
  const signHandler = async () => {
    if (!emailRule.test(email.value as string)) {
      alert("이메일을 양식에 맞게 입력해주세요." + "\n ex) 1234@naver.com");
      return;
    }

    sign({
      email: email.value,
      pwd: password.value,
      nickname: nickname.value,
    } as IUserFetc);
  };

  const cancelhandler = async () => {
    console.log("cancel");
    history.push("/");
  };
  const FocusOutHandler = async (type: string) => {
    const bo = await inputObjs[type].isCheck();
    setInputObj({ ...inputObj, [type]: bo });
  };
  // button 참조
  const submit: RefObject<HTMLButtonElement> = useRef<HTMLButtonElement>(null);
  // nickname input 연결 Hook 설정
  const nickname = useInputRef<HTMLButtonElement, HTMLInputElement>({
    id: "nickname",
    placeholder: "게임판 닉네임 (닉네임은 이후 수정이 불가능 합니다.) ",
    inputRef: useRef<HTMLInputElement>(null),
    target: submit,
    onFocusOut: FocusOutHandler,
    next: async (type: string) => {
      switch (type) {
        case "nickname":
          nickname.inputRef?.current?.blur();
          break;
      }
    },
  });
  // password input 연결 Hook 설정
  const cfpassword = useInputRef<HTMLInputElement, HTMLInputElement>({
    id: "cfpassword",
    placeholder: "비밀번호 재입력",
    type: "password",
    inputRef: useRef<HTMLInputElement>(null),
    target: nickname.inputRef,
    onFocusOut: FocusOutHandler,
  });
  // password input 연결 Hook 설정
  const password = useInputRef<HTMLInputElement, HTMLInputElement>({
    id: "password",
    placeholder: "비밀번호(8~32자리)",
    type: "password",
    inputRef: useRef<HTMLInputElement>(null),
    target: cfpassword.inputRef,
    onFocusOut: FocusOutHandler,
  });
  // email input 연결 Hook 설정
  const email: IUseInput = useInputRef<HTMLInputElement, HTMLInputElement>({
    id: "email",
    placeholder: "아이디(이메일)",
    target: password.inputRef,
    onFocusOut: FocusOutHandler,
  });

  // 회원가입 활성화

  const [disabled, setdisabled] = useState(true);

  /**
   * Description : 회원가입 시 유효성 검사
   * 구분 파라미터 : 초기 값 :0, 오류 : 1, 정상 : 2
   * 타입 : number (고정)
   */
  const [inputObj, setInputObj] = useState<{ [key: string]: number }>({
    [email.id as string]: 0,
    [password.id as string]: 0,
    [cfpassword.id as string]: 0,
    [nickname.id as string]: 0,
  });

  interface IinputArray {
    focusOutT: string;
    params: IUseInput;
    isCheck: () => Promise<number>;
  }
  const inputObjs: { [key: string]: IinputArray } = {
    [email.id as string]: {
      focusOutT: "이미 가입된 정보가 있습니다.",
      params: email,
      isCheck: async () => {
        if (email.value !== "") {
          const res = await isEmail(email.value as string);
          console.log("email check", res);
          return res ? 1 : 2;
        }
        return 0;
      },
    },
    [password.id as string]: {
      focusOutT: "비밀번호 양식을 다시 확인해주세요.",
      params: password,
      isCheck: async () => {
        if (password.value !== "") {
          return passwordRule.test(password.value as string) ? 2 : 1;
        }
        return 0;
      },
    },
    [cfpassword.id as string]: {
      focusOutT: "비밀번호가 일치하지 않습니다.",
      params: cfpassword,
      isCheck: async () => {
        if (cfpassword.value !== "") {
          return password.value === cfpassword.value ? 2 : 1;
        }
        return 0;
      },
    },
    [nickname.id as string]: {
      focusOutT: "이미 가입된 닉네임입니다.",
      params: nickname,
      isCheck: async () => {
        if (nickname.value !== "") {
          const res = await isnickName(nickname.value as string);
          return res ? 1 : 2;
        }
        return 0;
      },
    },
  };
  const inputArrs: Array<IinputArray> = [];
  Object.keys(inputObjs).forEach(key => {
    inputArrs.push(inputObjs[key]);
  });

  useEffect(() => {
    const state = history.location.state;
    if (state === undefined) {
      console.log("동의 미확인 ");
      alert("비정상적인 접근입니다.");
      history.push("/");
    }

    // console.log(inputObj);
    if (
      inputObj[email.id as string] === 2 &&
      inputObj[password.id as string] === 2 &&
      inputObj[cfpassword.id as string] === 2 &&
      inputObj[nickname.id as string] === 2
    ) {
      setdisabled(false);
    } else {
      setdisabled(true);
    }

    // 회원가입 버튼 활성화
  }, [history.location.state, email, password, cfpassword, nickname, inputObj]);

  return (
    <>
      <SLmainContainer>
        <CenterColumnBox>
          <SLlogoContainer>
            <SLlogoImg src={"/img/ga_3x_logo.png"}></SLlogoImg>
          </SLlogoContainer>
          <SLMidContainer>
            <SLMidSubContainer view={false}>
              <SLMainText>게임판 회원가입</SLMainText>
              {inputArrs.map((item, idx) => (
                <ColumnBox key={idx}>
                  <InputArea useinput={item.params}>
                    {item.params.id === password.id ? (
                      <PwdPlaceText>
                        8~32자의 영문, 숫자, 특수문자를 조합하여 설정해 주세요.
                      </PwdPlaceText>
                    ) : null}
                    <SignRule
                      checked={inputObj[item.params.id as string] === 1}
                    >
                      {item.focusOutT}
                    </SignRule>
                  </InputArea>
                </ColumnBox>
              ))}
              <PostArea>
                <InputText placeholder={"우편번호"}></InputText>
                <PostButton>
                  <PostText>우편번호 찾기</PostText>
                </PostButton>
              </PostArea>
              <InputArea>
                <InputText placeholder={"주소"}></InputText>
              </InputArea>
              <InputArea>
                <InputText placeholder={"상세주소"}></InputText>
              </InputArea>
            </SLMidSubContainer>
            <SignButtonArea>
              <SignButton
                disabled={disabled}
                ref={submit}
                onClick={signHandler}
              >
                <SignButtonText>가입하기</SignButtonText>
              </SignButton>
              <SignButtonCancel onClick={cancelhandler}>취소</SignButtonCancel>
            </SignButtonArea>
          </SLMidContainer>
        </CenterColumnBox>
      </SLmainContainer>
    </>
  );
};
export default SignAgree;
