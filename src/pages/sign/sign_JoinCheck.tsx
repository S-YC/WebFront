import React from "react";
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
} from "../../styles/comon/signLogin/common";

/**
 * 미완료 페이지
 * 휴대폰 본인인증 후 작업예정
 */

// 상하단 체크박스 구분선
const MidInLine = styled(RowBox)`
  height: 1px;
  margin: 24px 0;
  background-color: #ccc;
)`;

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
  const history = useHistory();

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
            <SLMidSubContainer view={false}>
              <SLMainText>이미 가입된 정보가 있습니다.</SLMainText>
              <MidInLine></MidInLine>
              <CenterColumnBox>
                이미 가입된 회원정보가 있습니다. <br></br>기억이 안나시면 아이디
                찾기를 통해서 아이디를 찾기 바랍니다.
              </CenterColumnBox>
              <ButtonArea>
                <Button onClick={SearchHandler.bind(this, "/login/SearchId")}>
                  <ButtonText1>아이디 찾기</ButtonText1>
                </Button>
                <ButtonText2 onClick={SearchHandler.bind(this, "/")}>
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
