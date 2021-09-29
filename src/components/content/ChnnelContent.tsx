import React from "react";
import styled from "styled-components";
import { IChnnelitem } from "../../store/modules/main/mainR";
import {
  CenterColumnBox,
  CenterRowBox,
  ImgBox,
} from "../../styles/comon/layout";

// 게임판TV List
const ChannelItemBox = styled(CenterColumnBox)`
  width: 288px;
  height: 250px;
  position: relative;
  margin-right: 10px;
`;

// 게임판TV 하단 영역
const ChnnelBtBar = styled(CenterRowBox)`
  margin-top: 10px;
`;

// 게임판TV Logo 생성
const ChnnelLogo = styled.div`
  width: 40px;
  height: 40px;
  margin: 0 8px 0 0;
  border-radius: 20px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.08);
  border: solid 1px rgba(0, 0, 0, 0.2);
  background-color: #fff;
`;

// 게임판TV Text 영역
const ChnnelTextBar = styled.div``;

// 게임판TV MainText
const ChnnelMainText = styled.span`
  font-size: 15px;
  font-weight: 600;
  letter-spacing: -0.3px;
  color: black;
`;

// 게임판TV 채널명
const ChnnelName = styled.span`
  margin-right: 10px;
  font-size: 13px;
  font-weight: 800;
  color: #f23917;
`;

// 게임판TV 조회수
const ChnnelView = styled.span`
  opacity: 0.5;
  font-size: 13px;
  font-weight: 300;
  color: #000000;
`;

interface IChnnelProps {
  idx: number;
  item: IChnnelitem;
}

const ChnnelContent: React.FC<IChnnelProps> = (props: IChnnelProps) => {
  return (
    <>
      <ChannelItemBox key={props.idx}>
        <ImgBox src={props.item.src}></ImgBox>
        <ChnnelBtBar>
          <ChnnelLogo> </ChnnelLogo>
          <ChnnelTextBar>
            <ChnnelMainText>{props.item.mainText}</ChnnelMainText>
            <ChnnelName>
              <br></br>
              {props.item.chnnelName}
            </ChnnelName>
            <ChnnelView>조회수 {props.item.chnnelView}만회</ChnnelView>
          </ChnnelTextBar>
        </ChnnelBtBar>
      </ChannelItemBox>
    </>
  );
};
export default ChnnelContent;
