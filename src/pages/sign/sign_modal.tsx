import React from "react";
import styled from "styled-components";
import {
  ColumnBox,
  RowBox,
  CenterColumnBox,
  CenterRowBox,
} from "../../styles/comon/layout";
import gaClose from "../../images/sign/GP_LPU_button_close.png";

/* 태그를 호충할떄는 대문자로 해야 인식되니 주의할 것 */
// 메인바 생성
const MainBar = styled(ColumnBox)`
  width: 448px;
  border-radius: 4px;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.12);
  border: solid 1px rgba(0, 0, 0, 0.2);
  background-color: #fff;
  margin: 0 auto;
`;

const MainBarSub = styled(ColumnBox)`
  margin: 0 auto;
`;

// Top Logo 영역
const MAinTextArea = styled(CenterRowBox)`
  justify-content: space-between;
  padding: 40px 40px 0 40px;
`;

const MainTextLeft = styled.span`
  font-size: 16px;
  font-weight: 500;
  line-height: 1.75;
  letter-spacing: -0.8px;
  color: #212121;
  display: flex;
`;

const MainCloseRight = styled.img`
  width: 14.8px;
  height: 14.8px;
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
`;

const MidInLine = styled(RowBox)`
  width: 368px;
  height: 1px;
  margin : 40px 40px 40px 40px;
  background-color: #ccc;
)`;

const BottomText = styled(CenterColumnBox)`
  opacity: 0.6;
  font-size: 13px;
  font-weight: normal;
  line-height: 1.46;
  letter-spacing: -0.65px;
  color: black;
  padding: 0 40px 0 40px;
`;

const SignAgree: React.FC = () => {
  return (
    <>
      <MainBar>
        <MainBarSub>
          <MAinTextArea>
            <MainTextLeft>서비스 이용약관</MainTextLeft>
            <MainCloseRight src={gaClose}></MainCloseRight>
          </MAinTextArea>
          <MidInLine></MidInLine>
          <BottomText>
            제 1장 총칙
            <br></br> <br></br>
            제1조 (목적) 이 약관은 주식회사 아이센스(이하 “회사”)가 온라인으로
            제공하는 게임서비스 및 이에 부수된 제반서비스(이하 “게임서비스”)의
            이용과 관련하여 회사와 회원 간의 권리, 의무 및 책임사항, 기타 필요한
            사항을 규정함을 목적으로 합니다.
            <br></br>
            제2조 (용어의 정의)
            <br></br> ① 이 약관에서 사용하는 정의는 다음과 같습니다.
            <br></br> 1. “회사”라 함은 온라인을 통하여 게임서비스를 제공하는
            사업자를 의미합니다.
            <br></br> 2. “회원”이라 함은 본 약관에 동의하고 게임서비스 이용
            자격을 부여받은 자를 의미합니다.
            <br></br>
            3. “게임서비스”라 함은 회사가 회원에게 온라인으로 제공하는
            게임서비스 및 이에 부수된 제반 서비스를 의미합니다.
            <br></br> 4. “게임세계”라 함은 게임서비스를 통해 다중의 회원이
            일정한 규칙(이하 “게임규칙”)에 따라 오락을 하거나 오락에 부수하여
            여가선용, 친목도모, 정보매개 등을 할 수 있도록 게임성의 콘텐츠를
            담은 게임서비스를 통해 다중의 어쩌고 저쩌고
            <br></br>
            5. “서비스 이용약관” 에 동의할 경우 영원히 회원탈퇴도 못하고
            게임판의 노예가 되는것을 반드시 숙지하여 신중히 판단해 주시길
            바랍니다. 회원가입은 신중해야 합니다. 들어올땐 마음대로 할 수 있지만
            나갈땐 아닐것이란 것을 알아야 어쩌고 저쩌고 더 쓸말이 없는것같다.
            <br></br>
            6. 이걸 꽉 채워야 하는관계로 으음 “게임세계”라 함은 게임서비스를
            통해 다중의 회원이 일정한 규칙(이하 “게임규칙”)에 따라 오락을 하거나
            오락에 부수하여 여가선용, 친목도모, 정보매개 등을 할 수 있도록
            게임성의 콘텐츠를 담은 게임서비스를 통해 다중의 어쩌고 저쩌고 더
            채워야 하는데 으음 가나다라 마바사 아자차카 타파하
          </BottomText>
          <MidInLine></MidInLine>
        </MainBarSub>
      </MainBar>
    </>
  );
};
export default SignAgree;
