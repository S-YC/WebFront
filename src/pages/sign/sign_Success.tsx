import React, { useEffect } from "react";
import styled from "styled-components";
import {
  CenterColumnBox,
  CenterRowBox,
  RowBox,
} from "../../styles/comon/layout";
import { useHistory } from "react-router";
import {
  SLmainContainer,
  SLlogoContainer,
  SLlogoImg,
  SLMidContainer,
  SLMidSubContainer,
  SLMainText,
} from "../../styles/comon/signLogin/common";

const MidLineArea = styled(CenterRowBox)`
  width: 100%;
  justify-content: space-between;
  margin-top: 50px;
  margin-bottom: 50px;
`;

const MidLineAreaBt = styled(CenterRowBox)`
  width: 100%;
  justify-content: space-between;
  margin-top: 150px;
`;

// Mid Line(줄)
const LeftLine = styled(RowBox)`
  width: 30%;
  height: 1px;
  border-radius: 4px;
  background-color: #e4e4e4;

  margin-right: 8px;
`;

// Mid Line(줄)
const RightLine = styled(RowBox)`
  width: 70%;
  height: 1px;
  border-radius: 4px;
  background-color: #e4e4e4;
`;

const MidCommonArea = styled(CenterColumnBox)`
  margin-top: 58px;
  height: 100%;
`;

const MidEmailText = styled(RowBox)`
  opacity: 0.6;
  font-size: 13px;
  font-weight: normal;
  line-height: 0.95;
  letter-spacing: -0.65px;
  margin-top: 29px;
`;

const MidNickNameText = styled(RowBox)`
  opacity: 0.6;
  font-size: 13px;
  font-weight: normal;
  line-height: 0.95;
  letter-spacing: -0.65px;
  margin-top: 29px;
`;

// ID(이메일) Box
const MidEmail = styled(RowBox)`
  opacity: 0.87;
  font-size: 15px;
  font-weight: 800;
  line-height: 1.53;
  letter-spacing: -0.3px;
  margin-top: 29px;
`;

// NickName Box
const MidNickname = styled(RowBox)`
  opacity: 0.87;
  font-size: 15px;
  font-weight: 800;
  line-height: 1.53;
  letter-spacing: -0.3px;
  margin-top: 29px;
`;

const ButtonArea = styled(CenterColumnBox)`
  margin-top: 200px;
`;

const Button = styled.span`
  padding: 17px 130px;
  border-radius: 28px;
  cursor: pointer;
  background-color: #141212;
  color: #fff;
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

const SignAgree: React.FC = () => {
  const history = useHistory<{ email: string; nickname: string }>();

  const ClickHandler = (path: string) => {
    history.push(path);
  };

  /* undefined 오류 방지를 위한 변수 선언 */
  let email = "";
  let nickname = "";

  /* 회원가입 데이터 조회 */
  if (history.location.state != undefined) {
    email = history.location.state.email;
    nickname = history.location.state.nickname;
  }

  useEffect(() => {
    // Direct 접근 확인
    if (history.location.state === undefined) {
      alert("비정상적인 접근입니다.");
      history.push("/");
    }
  }, [history.location.state]);
  return (
    <>
      <SLmainContainer>
        <CenterColumnBox>
          <SLlogoContainer>
            <SLlogoImg src={"/img/ga_3x_logo.png"}></SLlogoImg>
          </SLlogoContainer>
          <SLMidContainer>
            <SLMidSubContainer view={false}>
              <SLMainText>
                게임판 회원이 되신것을 <br></br> 환영합니다 :)
              </SLMainText>
              <MidLineArea>
                <LeftLine>
                  <MidCommonArea>
                    <MidEmailText>아이디</MidEmailText>
                    <MidNickNameText>닉네임</MidNickNameText>
                  </MidCommonArea>
                </LeftLine>
                <RightLine>
                  <MidCommonArea>
                    <MidEmail>{email}</MidEmail>
                    <MidNickname>{nickname}</MidNickname>
                  </MidCommonArea>
                </RightLine>
              </MidLineArea>
              <MidLineAreaBt>
                <LeftLine></LeftLine>
                <RightLine></RightLine>
              </MidLineAreaBt>
              <ButtonArea>
                <Button onClick={ClickHandler.bind(this, "/login/index")}>
                  <ButtonText1>로그인하기</ButtonText1>
                </Button>
                <ButtonText2 onClick={ClickHandler.bind(this, "/")}>
                  메인으로
                </ButtonText2>
              </ButtonArea>
            </SLMidSubContainer>
          </SLMidContainer>
        </CenterColumnBox>
      </SLmainContainer>
    </>
  );
};
export default SignAgree;
