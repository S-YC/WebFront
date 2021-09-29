import React, { RefObject } from "react";
import { Box, Input, Button, Container, Typography } from "@material-ui/core";

import useInput, { IUseInput } from "../store/hook/useInput";
import useUser from "../store/modules/user/useUser";
import { IUserFetc } from "../store/modules/user/userR";
import { useRef } from "react";
import styled from "styled-components";
import usePopup from "../store/modules/popup/usePopup";

const ContainerMainView = styled(Container)({
  padding: "10px 10px",
});

const BoxDiv = styled(Box)({
  marginBottom: "10px",
});

const TokenArea = styled(BoxDiv)({});

const Index: React.FC = () => {
  // password input 참조
  const passwordRef: RefObject<HTMLInputElement> =
    useRef<HTMLInputElement>(null);
  // button 참조
  const submit: RefObject<HTMLButtonElement> = useRef<HTMLButtonElement>(null);
  // email input 연결 Hook 설정
  const email: IUseInput = useInput<HTMLInputElement>({
    placeholder: "이메일을입력하세요",
    target: passwordRef,
  });
  // password input 연결 Hook 설정
  const password: IUseInput = useInput<HTMLButtonElement>({
    placeholder: "비밀번호를입력하세요",
    type: "password",
    target: submit,
  });
  // userHook.ts 에서 가지고온 hook
  const { login, errorMessage } = useUser();
  const { confirm } = usePopup();
  const loginHandler = async () => {
    const robj = await confirm("테스트중");
    console.log("loginHandler", robj);

    if (email.value !== "" && password.value !== "") {
      login({ email: email.value, pwd: password.value } as IUserFetc);
      alert("페이지 이동");
    } else {
      alert("입력해라");
    }
  };
  return (
    <>
      <ContainerMainView>
        <BoxDiv>메인페이지 입니다</BoxDiv>
        <BoxDiv>
          <Input {...email} />
        </BoxDiv>
        <BoxDiv>
          <Input inputRef={passwordRef} {...password} />
        </BoxDiv>
        <hr />
        <TokenArea>
          <BoxDiv>
            <Typography variant={"h6"}>Token + cookie 테스트</Typography>
          </BoxDiv>
        </TokenArea>
        <BoxDiv>
          <Button variant="outlined" ref={submit} onClick={loginHandler}>
            토큰 쿠키 저장
          </Button>
        </BoxDiv>
        {errorMessage ? (
          <BoxDiv>store에 저장된 error =&gt; {errorMessage}</BoxDiv>
        ) : (
          ""
        )}
        <BoxDiv></BoxDiv>
      </ContainerMainView>
    </>
  );
};
export default Index;
