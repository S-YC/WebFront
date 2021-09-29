import React, { RefObject, useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { CenterColumnBox, CenterRowBox } from "../../styles/comon/layout";
import useInput, { IUseInput, useInputRef } from "../../store/hook/useInput";
import { Input } from "@material-ui/core";
import useUser from "../../store/modules/user/useUser";
import { IUserFetc } from "../../store/modules/user/userR";
import { useHistory } from "react-router";
import {
  SLmainContainer,
  SLlogoContainer,
  SLlogoImg,
  SLMidContainer,
} from "../../styles/comon/signLogin/common";

// 로그인 ID, 패스워드 영역
const LoginArea = styled(CenterColumnBox)`
  width: 100%;
  padding: 14px 0 0;
  border: solid 1px var(--black);
  background-color: #fff;
`;

//  로그인 버튼 생성 (Default : 비활성화)
const LoginButton = styled.button<{ disabled: boolean }>`
  width: 368px;
  height: 56px;
  margin: 16px 0 24px;
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

// Login Button 텍스트
const LoginButtonText = styled.span`
  font-size: 15px;
  font-weight: normal;
  line-height: 0.82;
  letter-spacing: -0.75px;
`;

// 찾기 및 회원가입 영역
const MiddleArea = styled(CenterRowBox)``;

// 구분 bar 생성
const SearchBar = styled.span`
  width: 1px;
  height: 12px;
  margin: 28px 10px 174px;
  border-radius: 4px;
  background-color: #cbcbcb;
  margin: 0 10px 0 10px;
`;

// ID, 패스워드 찾기
const SearchIdPwd = styled.span`
  font-size: 13px;
  font-weight: normal;
  line-height: 0.95;
  letter-spacing: -0.65px;
  color: gray;
  cursor: pointer;
`;

// 회원가입
const Searchsign = styled.span`
  font-size: 13px;
  font-weight: normal;
  line-height: 0.95;
  letter-spacing: -0.65px;
  color: black;
  font-weight: 800;
  cursor: pointer;
`;

const SignAgree: React.FC = () => {
  const history = useHistory();

  const SearchHandler = (path: string) => {
    history.push(path);
  };

  // 로그인 활성화
  const [disabled, setdisabled] = useState(true);

  // button 참조
  const submit: RefObject<HTMLButtonElement> = useRef<HTMLButtonElement>(null);

  // password input 연결 Hook 설정
  const password = useInputRef<HTMLButtonElement, HTMLInputElement>({
    placeholder: "비밀번호",
    type: "password",
    inputRef: useRef<HTMLInputElement>(null),
    target: submit,
  });
  // email input 연결 Hook 설정
  const email: IUseInput = useInput<HTMLInputElement>({
    placeholder: "아이디 입력",
    target: password.inputRef,
  });

  // userHook.ts 에서 가지고온 hook
  const { login, errorMessage } = useUser();
  const loginHandler = async () => {
    if (email.value !== "" && password.value !== "") {
      login({ email: email.value, pwd: password.value } as IUserFetc);
      alert("페이지 이동");
    } else {
      alert("입력해라");
    }
  };

  // useEffect : ID, 패스워드 입력 시 로그인 활성화
  useEffect(() => {
    if (email.value !== "" && password.value !== "") {
      setdisabled(false);
    } else {
      setdisabled(true);
    }
  }, [email.value, password.value]);

  return (
    <>
      <SLmainContainer>
        <CenterColumnBox>
          <SLlogoContainer>
            <SLlogoImg src={"/img/ga_3x_logo.png"}></SLlogoImg>
          </SLlogoContainer>
          <SLMidContainer>
            <CenterColumnBox>
              <LoginArea>
                <Input {...email} style={{ width: "70%" }} />
              </LoginArea>
              <LoginArea>
                <Input {...password} style={{ width: "70%" }} />
              </LoginArea>
              <hr />
              {/* <LoginArea>
              <Button variant="outlined" ref={submit} onClick={loginHandler}>
                토큰 쿠키 저장
              </Button>
            </LoginArea> */}
              {errorMessage ? (
                <LoginArea>store에 저장된 error =&gt; {errorMessage}</LoginArea>
              ) : (
                ""
              )}
              <LoginArea></LoginArea>
              <CenterRowBox>
                <LoginButton
                  disabled={disabled}
                  ref={submit}
                  onClick={loginHandler}
                >
                  <LoginButtonText>로그인</LoginButtonText>
                </LoginButton>
              </CenterRowBox>
              <MiddleArea>
                <SearchIdPwd
                  onClick={SearchHandler.bind(this, "/login/SearchId")}
                >
                  아이디 찾기
                </SearchIdPwd>
                <SearchBar></SearchBar>
                <SearchIdPwd
                  onClick={SearchHandler.bind(this, "/login/SearchPwd")}
                >
                  패스워드 찾기
                </SearchIdPwd>
                <SearchBar></SearchBar>
                <Searchsign onClick={SearchHandler.bind(this, "/signAgree")}>
                  회원가입
                </Searchsign>
              </MiddleArea>
            </CenterColumnBox>
          </SLMidContainer>
        </CenterColumnBox>
      </SLmainContainer>
    </>
  );
};
export default SignAgree;
