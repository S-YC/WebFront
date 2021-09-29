import React, { useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import {
  CenterColumnBox,
  CenterRowBox,
  RowBox,
} from "../../styles/comon/layout";
import {
  SLmainContainer,
  SLlogoContainer,
  SLlogoImg,
  SLMidContainer,
  SLMidSubContainer,
  SLMainText,
  MidInLine,
} from "../../styles/comon/signLogin/common";

const MidLineArea = styled(CenterRowBox)`
  width: 100%;
  justify-content: space-between;
  margin-top: 50px;
  margin-bottom: 50px;
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

const MidLineAreaBt = styled(CenterRowBox)`
  width: 100%;
  justify-content: space-between;
  margin-top: 150px;
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

const MidText = styled(RowBox)`
  opacity: 0.6;
  font-size: 13px;
  font-weight: normal;
  line-height: 0.95;
  letter-spacing: -0.65px;
`;

const SignAgree: React.FC = () => {
  const history = useHistory();

  /**
   * Description : 아이디 찾기 UI 구분
   * parameter : [0] : 본인인증, [1] 아이디 조회 성공, [2] 아이디 조회 실패
   * 구분  : true : 숨김, false : 노출
   * parameter type : boolean (고정)
   */
  const [view, setdview] = useState<Array<boolean>>([false, true, true]);

  // 본인인증 API 호출 부분
  const AutoMobile = () => {
    if (history.location.state === undefined) {
      setdview([true, false, true]);
    } else {
      setdview([true, true, false]);
    }
  };
  const SearchHandler = (path: string) => {
    history.push(path);
  };
  return (
    <>
      <SLmainContainer>
        <CenterColumnBox>
          <SLlogoContainer>
            <SLlogoImg src={"/img/ga_3x_logo.png"}></SLlogoImg>
          </SLlogoContainer>
          <SLMidContainer>
            <SLMidSubContainer view={view[0]}>
              <SLMainText>
                게임판<br></br> 아이디를 찾기 위해 본인인증이<br></br>
                필요합니다.
              </SLMainText>
              <ButtonArea>
                <Button onClick={AutoMobile}>
                  <ButtonText1>휴대전화로 본인인증 하기</ButtonText1>
                </Button>
                <ButtonText2>이전으로</ButtonText2>
              </ButtonArea>
            </SLMidSubContainer>
            <SLMidSubContainer view={view[1]}>
              <SLMainText>
                입력하신 정보와 <br></br>일치하는 <br></br>게임판 아이디 정보
                입니다.
              </SLMainText>
              <MidLineArea>
                <LeftLine>
                  <MidCommonArea>
                    <MidEmailText>아이디</MidEmailText>
                    <MidNickNameText>가입일</MidNickNameText>
                  </MidCommonArea>
                </LeftLine>
                <RightLine>
                  <MidCommonArea>
                    <MidEmail>gamepan@gamepan.co.kr</MidEmail>
                    <MidNickname>2019 - 07 - 15</MidNickname>
                  </MidCommonArea>
                </RightLine>
              </MidLineArea>
              <MidLineAreaBt>
                <LeftLine></LeftLine>
                <RightLine></RightLine>
              </MidLineAreaBt>
              <ButtonArea>
                <Button onClick={SearchHandler.bind(this, "/login/index")}>
                  <ButtonText1>로그인 하기</ButtonText1>
                </Button>
                <ButtonText2>비밀번호 찾기</ButtonText2>
              </ButtonArea>
            </SLMidSubContainer>
            <SLMidSubContainer view={view[2]}>
              <SLMainText>게임판에 가입되어 있지 않습니다.</SLMainText>
              <MidInLine></MidInLine>
              <MidText>
                게임판에 가입되어 있지 않습니다. <br></br>회원가입을 해주세요.
              </MidText>
              <ButtonArea>
                <Button onClick={SearchHandler.bind(this, "/signAgree")}>
                  <ButtonText1>회원가입</ButtonText1>
                </Button>
                <ButtonText2 onClick={SearchHandler.bind(this, "/main")}>
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
