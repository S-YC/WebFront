import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import gaFooterBar from "../../images/main/gp_footer_bar.png";
import { FlexEnd } from "../../styles/comon/layout";

// 하단 바 생성
const GaFooter = styled.div`
  padding: 32px 40px;
  background-color: black;
`;

// 하단 바 Top 영역
const GaFooterTopText = styled.span`
  margin: 0 10px 32px 0;
  font-size: 14px;
  font-weight: 300;
  letter-spacing: -0.28px;
  color: #dedede;
`;

// 하단 바 | 생성
const GaFooterBar = styled.img`
  width: 1px;
  margin-left: 10px;
`;

// 하단 바 bottom 영역
const GaFooterBt = styled.span`
  font-size: 13px;
  font-weight: 300;
  letter-spacing: -0.26px;
  color: #616161;
`;

const GaFooterLogoBar = styled(FlexEnd)``;

// 하단 바 Logo
const GaFooterLogo = styled.img`
  max-width: 86px;
`;

/* 하단 TopText interface  */
export interface IFooter {
  id: number;
  mainText: string;
  // link: string;
}

const FooterBar: React.FC = () => {
  /* 하단 TopText Data  */
  const IFooterTopList: Array<IFooter> = [
    {
      id: 0,
      mainText: "고객센터",
    },
    {
      id: 1,
      mainText: "이용약관",
    },
    {
      id: 2,
      mainText: "개인정보 취급방침",
    },
  ];
  return (
    <>
      <GaFooter>
        {IFooterTopList.map((item, idx) => (
          <GaFooterTopText key={idx}>
            <Link
              to="/"
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              {item.mainText}
            </Link>
            <GaFooterBar src={gaFooterBar}></GaFooterBar>
          </GaFooterTopText>
        ))}
        <GaFooterLogoBar>
          <GaFooterLogo src={"/img/ga_3x_logo.png"}></GaFooterLogo>
        </GaFooterLogoBar>
        <GaFooterBt>
          서울시 구로구 디지털로 33길 11 (구로동 에이스테크노타워 8차 804-6호|
          대표자 : 윤석범 | 사업자등 록번호 : 119 - 8650 - 905
          <br></br>
          Copyright 2020ISENS F&C Co., Ltd. All Right Reserved.
        </GaFooterBt>
      </GaFooter>
    </>
  );
};
export default FooterBar;
