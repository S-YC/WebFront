import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { IMatchitem } from "../../store/modules/main/mainR";
import gaLogo from "../../images/main/gp_lol_icon.png";
import gaArrow from "../../images/main/gp_main_button_arrow_white.png";
import gaCover from "../../images/main/gp_main_cover.png";
import {
  RowBox,
  CenterColumnBox,
  RowReverseBox,
  ImgBox,
} from "../../styles/comon/layout";

// 게임대회 List
const MatchitemBox = styled(CenterColumnBox)`
  width: 282px;
  height: 400px;
  position: relative;
  padding-top: 40px;
  :nth-child(1n + 2) {
    margin-left: 10px;
  }
`;

// 게임대회 img
const MatchImg = styled(ImgBox)`
  position: absolute;
  bottom: 0;
  z-index: -1;
`;

// 게임대회 Logo 영역
const MatchLogoBox = styled(RowBox)`
  width: 100%;
`;
// 게임대회 Logo
const MatchLogo = styled.img`
  margin: 20px 0px 0px 20px;
  width: 32px;
  height: 32px;
  border-radius: 20px;
  border: solid 1px rgba(255, 255, 255, 0.2);
  background-color: #000;
`;

// 게임대회 Text 영역
const MatchTextBox = styled(RowReverseBox)`
  height: 100%;
  margin-bottom: 10px;
`;

// 게임대회 MainText
const MatchMainText = styled.span`
  font-size: 28px;
  font-weight: bold;
  letter-spacing: -1.4px;
  color: #fed012;
`;

// 게임대회 Money Color
const MatchMoneyText = styled.span`
  color: #f01a43;
`;

// 게임대회 SubText
const MatchSubText = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #fff;
`;

// 게임대회 Button 생성
const MatchButton = styled.button`
  width: 230px;
  height: 40px;
  margin-top: 8px;
  border-radius: 20px;
  border: solid 1px #fed012;
  background-color: rgba(255, 255, 255, 0.1);
  cursor: pointer;
`;

// 게임대회 Button Text
const MatchButtonText = styled.span`
  margin-right: 6px;
  font-size: 15px;
  font-weight: 300;
  color: #fed012;
`;
// 게임대회 Arrow Img
const MatchButtonArrow = styled.img`
  color: #fff;
`;

interface IMatchContentProps {
  idx: number;
  item: IMatchitem;
}

const MatchContent: React.FC<IMatchContentProps> = (
  props: IMatchContentProps
) => {
  return (
    <>
      <MatchitemBox key={props.idx}>
        <MatchLogoBox>
          <MatchLogo src={gaLogo} />
        </MatchLogoBox>
        <MatchTextBox>
          <MatchButton>
            <Link
              to={props.item.buttonlink}
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              <MatchButtonText>{props.item.buttonText}</MatchButtonText>
              <MatchButtonArrow src={gaArrow}></MatchButtonArrow>
            </Link>
          </MatchButton>
          <MatchMainText>
            후원상금<MatchMoneyText>{props.item.money}</MatchMoneyText>만원
          </MatchMainText>
          <MatchSubText> {props.item.mainText}</MatchSubText>
        </MatchTextBox>

        <MatchImg src={props.item.src} />
        <MatchImg src={gaCover} />
      </MatchitemBox>
    </>
  );
};
export default MatchContent;
