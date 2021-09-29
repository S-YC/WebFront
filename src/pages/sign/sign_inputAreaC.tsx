import { Input } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import { IUseInput } from "../../store/hook/useInput";
import { ColumnBox } from "../../styles/comon/layout";

// 공통 Input 박스 영역
const Area = styled(ColumnBox)`
  max-width: 368px;
  margin-top: 22px;
`;

// 공통 Input 생성
const InputText = styled(Input)`
  opacity: 0.87;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: -0.65px;
  width: 100%;
`;

interface InputAreaProps {
  useinput?: IUseInput;
  children?: React.ReactNode;
}

const InputArea: React.FC<InputAreaProps> = (props: InputAreaProps) => {
  return (
    <>
      <Area>
        {props.useinput !== undefined ? (
          <InputText {...props.useinput}></InputText>
        ) : (
          ""
        )}
        {props.children !== undefined ? <div>{props.children}</div> : ""}
      </Area>
    </>
  );
};
export default InputArea;
