import styled from "styled-components";
import { ColumnBox } from "../layout";

// 메인페이지 메인 컨테이너
export const MainContainer = styled(ColumnBox)`
  max-width: 1280px;
  // border: 1px solid red;
`;

// 리스트 컨테이너 (게임대회)
export const ListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  padding: 10px;
`;

// 리스트 컨테이너 (게임판TV))
export const ListContainer2 = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 30px;
`;
