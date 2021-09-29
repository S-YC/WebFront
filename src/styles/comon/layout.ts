import styled from "styled-components";

/*
 * 공통으로 사용되는 css 태그를 선언한 파일
 * 필요 시 컴포넌트를 추가하여 수정 할 것
 * import로 페이지 내 컴포넌트를 호출하여 사용
 */

export const RowBox = styled.div`
  display: flex;
  flex-direction: row;
`;

export const ColumnBox = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FlexEnd = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const RowReverseBox = styled.div`
  display: flex;
  flex-direction: column-reverse;
`;

export const CenterRowBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const CenterColumnBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const ImgBox = styled.img`
  width: 100%;
`;
