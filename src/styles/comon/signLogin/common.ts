import styled, { css } from "styled-components";
import { ColumnBox, CenterColumnBox, ImgBox, RowBox } from "../layout";

// 로그인/회원가입 메인 컨테이너 생성
export const SLmainContainer = styled(ColumnBox)`
  width: 100%;
`;

// Logo 컨테이너
export const SLlogoContainer = styled(CenterColumnBox)`
  width: 464px;
  padding: 14px 135.7px 8.8px 142px;
`;

// Logo 이미지
export const SLlogoImg = styled(ImgBox)``;

// Mid 컨테이너
export const SLMidContainer = styled(CenterColumnBox)`
  max-width: 1280px;
  border: solid 1px #e4e4e4;
  padding: 48px;
`;

// MidSub 컨테이너
export const SLMidSubContainer = styled(ColumnBox)<{ view: boolean }>`
  ${props => {
    if (props.view) {
      return css`
        display: none;
      `;
    } else {
      return css`
        display: block;
      `;
    }
  }}
`;

// 상하단 Line
export const MidInLine = styled(RowBox)`
  height: 1px;
  margin: 24px 0;
  background-color: #ccc;
)`;

// MidTop Text
export const SLMainText = styled.span`
  font-size: 24px;
  font-weight: bold;
  letter-spacing: -1.2px;
`;

// 공통 Button
export const SLButton = styled.button<{ disabled: boolean }>`
  padding: 17px 130px;
  border-radius: 28px;
  border: none;
  cursor: pointer;
  ${props => {
    if (props.disabled) {
      return css`
        background-color: #f5f5f5;
        color: #c4c4c4;
      `;
    } else {
      return css`
        background-color: #141212;
        color: #fff;
      `;
    }
  }}
`;
