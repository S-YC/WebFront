import React, { useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import { CenterColumnBox, RowBox } from "../../styles/comon/layout";
import {
  SLmainContainer,
  SLlogoContainer,
  SLlogoImg,
  SLMidContainer,
  SLMidSubContainer,
  SLMainText,
  MidInLine,
} from "../../styles/comon/signLogin/common";

const MidCommonArea = styled(CenterColumnBox)`
  margin-top: 58px;
  height: 100%;
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

const MidText2 = styled(RowBox)`
  font-size: 15px;
  font-weight: bold;
  line-height: 2;
  letter-spacing: -0.65px;
`;

const SignAgree: React.FC = () => {
  const history = useHistory();
  const [nickName] = useState("성연철");

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
                게임판<br></br>휴면 아이디 재사용
              </SLMainText>
              <MidInLine></MidInLine>
              <MidCommonArea>
                <MidText2>
                  안녕하세요 {nickName}님<br></br>
                  <br></br>GAMEPAN을 오랫동안 이용하지 않아 회원님의 아이디가
                  휴면 <br></br> 상태로 전환되었습니다. <br></br>
                  <br></br>해당 아이디로 서비스를 다시 이용하고 싶은 경우에는,
                  휴대전화 <br></br>
                  본인인증 절차 완료 후 재사용이 가능합니다.
                </MidText2>
              </MidCommonArea>
              <ButtonArea>
                <Button onClick={AutoMobile}>
                  <ButtonText1>휴대전화로 본인인증 하기</ButtonText1>
                </Button>
                <ButtonText2>이전으로</ButtonText2>
              </ButtonArea>
            </SLMidSubContainer>
            <SLMidSubContainer view={view[1]}>
              <SLMainText>
                게임판<br></br>휴면 아이디 재사용 신청 완료
              </SLMainText>
              <MidInLine></MidInLine>
              <MidCommonArea>
                <MidText2>
                  재사용 신청이 모두 완료되었습니다.<br></br> 로그인 하셔서
                  GAMEPAN 이용을 해주시기 바랍니다. <br></br>감사합니다.
                </MidText2>
              </MidCommonArea>
              <ButtonArea>
                <Button onClick={SearchHandler.bind(this, "/login/index")}>
                  <ButtonText1>로그인 하기</ButtonText1>
                </Button>
              </ButtonArea>
            </SLMidSubContainer>
            <SLMidSubContainer view={view[2]}>
              <SLMainText>
                게임판 <br></br>휴면 아이디 재사용 정보확인 안내
              </SLMainText>
              <MidInLine></MidInLine>
              <MidCommonArea>
                <MidText2>
                  휴대전화 본인인증 정보와 게임판 정보가 일치하지 않습니다.
                  <br></br>회원가입이 필요합니다.
                </MidText2>
              </MidCommonArea>
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
