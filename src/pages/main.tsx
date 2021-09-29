import React, { useEffect } from "react";
import styled from "styled-components";
import TopBannerSrc from "../images/main/ga_main_top_banner.png";
import adBanner from "../images/main/main_sub_banner.png";
import MatchContent from "../components/content/MatchContent";
import ChnnelContent from "../components/content/ChnnelContent";
import {
  MainContainer,
  ListContainer,
  ListContainer2,
} from "../styles/comon/main/main";
import { RowBox, CenterRowBox, ImgBox } from "../styles/comon/layout";
import useMain from "../store/modules/main/useMain";
/* 태그를 호충할떄는 대문자로 해야 인식되니 주의할 것 */

//TOP 배너 영역
const TopBanner = styled.div`
  max-width: 1280px;
  cursor: pointer;
`;

//TOP 배너 Img
const TopBannerImg = styled(ImgBox)``;

// 메인 글 div
const MainTextContainer = styled(CenterRowBox)`
  width: 100%;
  justify-content: space-between;
  padding: 0 70px 0 60px;
  margin-top: 40px;
`;

// 메인바 좌측 텍스트 style
const LeftText = styled(RowBox)`
  font-size: 26px;
  font-weight: 800;
`;

// 메인바 우측 텍스트
const RightText = styled(RowBox)`
  font-size: 16px;
  font-weight: 300;
  color: #9e9e9e;
`;

// 메인바 우측 텍스트 style
const LegueAll = styled.span`
  font-size: 16px;
  font-weight: 300;
  color: #666;
`;

// 메인바 현재대회 Count Color
const RecentCount = styled.span`
  color: #f5921f;
`;

// 메인바 모든대회 화살표 style
const LegueArrow = styled.span`
  width: 6px;
  height: 12px;
  border: solid 2px var(--brownish-grey);
  cursor: pointer;
`;

// 광고배너 바
const AdBanner = styled(RowBox)`
  max-width: 1280px;
  margin-top: 64px;
  cursor: pointer;
`;

// 매치 No data span
const MatchError = styled.span``;

// 채널 No data span
const ChnnelError = styled.span`
  margin: 0 auto;
  padding-bottom: 40px;
`;

// 광고이미지 img
const AdImg = styled(ImgBox)``;

const MainPage: React.FC = () => {
  const { MatchList } = useMain();
  const { chnnelList } = useMain();
  const { getData } = useMain();
  const { getData2 } = useMain();
  console.log(chnnelList);
  useEffect(() => {
    console.log("useLayoutEffect");
    if (MatchList === undefined) {
      getData();
    }
    if (chnnelList === undefined) {
      getData2();
    }
  }, [MatchList, chnnelList]);
  return (
    <>
      <MainContainer>
        <TopBanner>
          <TopBannerImg src={TopBannerSrc}></TopBannerImg>
          {/* <TopBannerAllow>{`<`}</TopBannerAllow> */}
        </TopBanner>
        <MainTextContainer>
          <LeftText>지금 참여 가능한 대회</LeftText>
          <RightText>
            <RecentCount>1</RecentCount>/7
            <LegueAll>모든대회 보기</LegueAll>
            <LegueArrow>{`>>`}</LegueArrow>
          </RightText>
        </MainTextContainer>
        <ListContainer>
          {MatchList === undefined ? (
            <MatchError>매치 데이터가 없습니다.</MatchError>
          ) : null}
          {MatchList?.map((item, idx) => (
            <MatchContent key={idx} idx={idx} item={item} />
          ))}
        </ListContainer>
        <AdBanner>
          <AdImg src={adBanner}></AdImg>
        </AdBanner>
        <MainTextContainer>
          <LeftText>게임판 TV</LeftText>
        </MainTextContainer>
        <ListContainer2>
          {chnnelList === undefined ? (
            <ChnnelError>채널 데이터가 없습니다.</ChnnelError>
          ) : null}
          {chnnelList?.map((item, idx) => (
            <ChnnelContent key={idx} idx={idx} item={item} />
          ))}
        </ListContainer2>
      </MainContainer>
    </>
  );
};
export default MainPage;
