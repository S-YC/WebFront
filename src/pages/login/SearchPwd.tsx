import React, { RefObject, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import styled, { css } from "styled-components";
import {
  emailRule,
  IUseInput,
  passwordRule,
  useInputRef,
} from "../../store/hook/useInput";
import usePopup from "../../store/modules/popup/usePopup";
import useSign from "../../store/modules/sign/useSign";
import { CenterColumnBox, ColumnBox, RowBox } from "../../styles/comon/layout";
import {
  SLmainContainer,
  SLlogoContainer,
  SLlogoImg,
  SLMidContainer,
  SLMidSubContainer,
  SLMainText,
  SLButton,
  MidInLine,
} from "../../styles/comon/signLogin/common";
import InputArea from "../sign/sign_inputAreaC";

const MidText = styled(RowBox)`
  opacity: 0.6;
  font-size: 13px;
  font-weight: normal;
  line-height: 0.95;
  letter-spacing: -0.65px;
`;

const ButtonArea = styled(CenterColumnBox)`
  margin-top: 108px;
`;

const ButtonText1 = styled.span`
  font-size: 15px;
  font-weight: normal;
  letter-spacing: -0.75px;
`;

const ButtonText2 = styled.span`
  font-size: 13px;
  margin-top: 16px;
  font-weight: normal;
  cursor: pointer;
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

const SignAgree: React.FC = () => {
  /**
   * Description : 비밀번호 찾기 UI 구분
   * parameter : [0] : 아이디 조회 성공, [1] 아이디 등록 X
   * 구분  : true : 숨김, false : 노출
   * parameter type : boolean (고정)
   */
  const [view, setview] = useState<Array<boolean>>([false, true, true, true]);

  // 버튼 비활성화
  const [disabled, setdisabled] = useState<Array<boolean>>([true, true]);

  const history = useHistory();

  const FocusOutHandler = async (type: string) => {
    const bo = await inputObjs[type].isCheck();
    console.log(bo);
    setInputObj({ ...inputObj, [type]: bo });
  };
  // button 참조
  const submit: RefObject<HTMLButtonElement> = useRef<HTMLButtonElement>(null);
  // email input 연결 Hook 설정
  const email = useInputRef<HTMLButtonElement, HTMLInputElement>({
    id: "email",
    placeholder: "아이디(이메일)",
    inputRef: useRef<HTMLInputElement>(null),
    target: submit,
    onFocusOut: FocusOutHandler,
    next: async (type: string) => {
      switch (type) {
        case "email":
          email.inputRef?.current?.blur();
          break;
      }
    },
  });

  const cfpassword = useInputRef<HTMLButtonElement, HTMLInputElement>({
    id: "cfpassword",
    placeholder: "비밀번호 재입력",
    type: "password",
    inputRef: useRef<HTMLInputElement>(null),
    target: submit,
    onFocusOut: FocusOutHandler,
    next: async (id: string) => {
      switch (id) {
        case "cfpassword":
          cfpassword.inputRef?.current?.blur();
          break;
      }
    },
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

  /**
   * Description : 회원가입 시 유효성 검사
   * 구분 파라미터 : 초기 값 :0, 오류 : 1, 정상 : 2
   * 타입 : number (고정)
   */
  const [inputObj, setInputObj] = useState<{ [key: string]: number }>({
    [email.id as string]: 0,
    [password.id as string]: 0,
    [cfpassword.id as string]: 0,
  });

  interface IinputArray {
    focusOutT: string;
    params: IUseInput;
    isCheck: () => Promise<number>;
  }
  const inputObjs: { [key: string]: IinputArray } = {
    [email.id as string]: {
      focusOutT: "이메일 형식을 다시 확인해주세요.",
      params: email,
      isCheck: async () => {
        if (email.value !== "") {
          return emailRule.test(email.value as string) ? 2 : 1;
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
  };
  const inputArrs: Array<IinputArray> = [];
  Object.keys(inputObjs).forEach(key => {
    inputArrs.push(inputObjs[key]);
  });

  const { isEmail } = useSign();

  const PwdCHandler = async () => {
    const res = await isEmail(email.value as string);

    console.log(res);

    if (res) {
      setview([true, true, false, true]);
    } else {
      setview([true, false, true, true]);
    }
  };

  const SearchHandler = (path: string) => {
    history.push(path);
  };

  const AutoMobile = () => {
    setview([true, true, true, false]);
  };

  const { confirm } = usePopup();

  const ExChageHandler = async () => {
    const robj = await confirm("비밀번호 변경이 완료되었습니다.");
    console.log(robj);
    history.push("/login/index");
  };

  useEffect(() => {
    if (inputObj[email.id as string] === 2) {
      setdisabled([false, true]);
    } else {
      setdisabled([true]);
    }

    if (
      inputObj[password.id as string] === 2 &&
      inputObj[cfpassword.id as string] === 2
    ) {
      setdisabled([true, false]);
    }
  }, [inputObj]);

  return (
    <>
      <SLmainContainer>
        <CenterColumnBox>
          <SLlogoContainer>
            <SLlogoImg src={"/img/ga_3x_logo.png"}></SLlogoImg>
          </SLlogoContainer>
          <SLMidContainer>
            <SLMidSubContainer view={view[0]}>
              <SLMainText>비밀번호 찾기</SLMainText>
              <MidInLine></MidInLine>
              <MidText> 아이디(이메일)을 입력해주세요.</MidText>
              {inputArrs.map((item, idx) => (
                <ColumnBox key={idx}>
                  {item.params.id === "email" ? (
                    <InputArea useinput={item.params}>
                      <SignRule
                        checked={inputObj[item.params.id as string] === 1}
                      >
                        {item.focusOutT}
                      </SignRule>
                    </InputArea>
                  ) : null}
                </ColumnBox>
              ))}
              <ButtonArea>
                <SLButton
                  disabled={disabled[0]}
                  ref={submit}
                  onClick={PwdCHandler}
                >
                  <ButtonText1>다음</ButtonText1>
                </SLButton>
                <ButtonText2 onClick={SearchHandler.bind(this, "/login/index")}>
                  이전으로
                </ButtonText2>
              </ButtonArea>
            </SLMidSubContainer>
            <SLMidSubContainer view={view[1]}>
              <SLMainText> 아이디가 존재하지 않습니다.</SLMainText>
              <MidInLine></MidInLine>
              <MidText>
                입력한 정보와 일치하는 아이디가 존재하지 않습니다.
              </MidText>
              <ButtonArea>
                <SLButton
                  disabled={false}
                  onClick={SearchHandler.bind(this, "/login/SearchId")}
                >
                  <ButtonText1>아이디 찾기</ButtonText1>
                </SLButton>
                <ButtonText2 onClick={SearchHandler.bind(this, "/main")}>
                  메인으로
                </ButtonText2>
              </ButtonArea>
            </SLMidSubContainer>
            <SLMidSubContainer view={view[2]}>
              <SLMainText>
                비밀번호 <br></br>재설정을 위해 사용자 확인을 <br></br>
                진행합니다.
              </SLMainText>
              <ButtonArea>
                {/* 휴대폰 본인인증 API 호출 부분 */}
                <SLButton disabled={false} onClick={AutoMobile}>
                  <ButtonText1>휴대폰 본인인증 하기</ButtonText1>
                </SLButton>
                <ButtonText2 onClick={SearchHandler.bind(this, "/login/index")}>
                  이전으로
                </ButtonText2>
              </ButtonArea>
            </SLMidSubContainer>
            <SLMidSubContainer view={view[3]}>
              <SLMainText> 새로운 비밀번호를 입력해주세요.</SLMainText>
              <MidInLine></MidInLine>
              {inputArrs.map((item, idx) => (
                <ColumnBox key={idx}>
                  {item.params.id === "password" ||
                  item.params.id === "cfpassword" ? (
                    <InputArea useinput={item.params}>
                      <SignRule
                        checked={inputObj[item.params.id as string] === 1}
                      >
                        {item.focusOutT}
                      </SignRule>
                    </InputArea>
                  ) : null}
                </ColumnBox>
              ))}
              <ButtonArea>
                <SLButton
                  ref={submit}
                  disabled={disabled[1]}
                  onClick={ExChageHandler}
                >
                  <ButtonText1>변경하기</ButtonText1>
                </SLButton>
              </ButtonArea>
            </SLMidSubContainer>
          </SLMidContainer>
        </CenterColumnBox>
      </SLmainContainer>
    </>
  );
};
export default SignAgree;
