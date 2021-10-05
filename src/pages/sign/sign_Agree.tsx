import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  RowBox,
  CenterColumnBox,
  CenterRowBox,
} from "../../styles/comon/layout";
import { css } from "styled-components";
import { useHistory } from "react-router-dom";
import useInput, {
  IUseChangeParam,
  IUseInput,
} from "../../store/hook/useInput";
import {
  SLmainContainer,
  SLlogoContainer,
  SLlogoImg,
  SLMidContainer,
  SLMidSubContainer,
  SLMainText,
} from "../../styles/comon/signLogin/common";
import usePopup from "../../store/modules/popup/usePopup";

// 삳단 체크박스 영역-0
const MidcheckBoxArea = styled(CenterRowBox)`
  margin-top: 40px;
`;

// 공통 체크박스 생성
const MidCheckButton = styled.input`
  width: 24px;
  height: 24px;
  padding: 2px 5px 8.9px 7px;
  border-radius: 16px;
  border: solid 1px #9d9d9d;
  cursor: pointer;
`;

// 상하단 체크박스 구분선
const MidInLine = styled(RowBox)`
  height: 1px;
  margin: 24px 0;
  background-color: #ccc;
)`;

// 체크박스 하단 영역
const MidckTopArea = styled(CenterRowBox)`
  margin-bottom: 24px;
`;

// 전체동의 체크박스 TEXT
const MidAllckLabel = styled.label`
  font-size: 18px;
  font-weight: bold;
  letter-spacing: -0.9px;
  color: #212121;
  margin-left: 8px;
`;

// 전체동의 하단 TEXT
const MidSubText = styled.span`
  margin: 12px 0 0 40px;
  opacity: 0.6;
  font-size: 13px;
  letter-spacing: -0.65px;
  color: black;
`;

// 하단 체크박스 tTEXT
const MidckLabel = styled.label`
  margin-left: 8px;
  font-size: 16px;
  letter-spacing: -0.8px;
  text-align: left;
  color: gray;
`;

// 약관동의 버튼 생성
const AgreeButton = styled.button<{ disabled: boolean }>`
  padding: 17px 164px;
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

// 약관동의 TEXT
const AgreeButtonText = styled.span`
  font-size: 15px;
  font-weight: normal;
  letter-spacing: -0.75px;
`;

// 약관동의 취소
const AgreeCancel = styled.span`
  font-size: 13px;
  margin-top: 16px;
  font-weight: normal;
  color: gray;
  cursor: pointer;
`;
/* 하단 TopText interface  */
interface ISignAgree {
  id: number;
  ArgeeText: string;
  params: IUseInput;
}

const SignAgree: React.FC = () => {
  const history = useHistory();
  // 동의버튼 활성화
  const [disabled, setdisabled] = useState(true);
  // 단일 체크박스 활성화
  const checkValue: Array<boolean> = [];

  // 팝업 생성
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { confirm } = usePopup();

  // 약관동의 실행
  const AgreeHandler = async (sign: string) => {
    const id: Array<number> = [];

    // 필수,선택 동의 값 생성
    ISignAgreeList.forEach(item => {
      id.push(item.id);
      checkValue.push(item.params.checked as boolean);
    });

    // 필수동의 항목 체크유무
    if (checkValue[0] === false || checkValue[1] === false) {
      alert("게임판 서비스 및 개인정보 약관에 동의해주세요.");
      return;
    }

    // history는 for문 밖에서 선언
    history.push({
      pathname: sign,
      state: { id: id, value: checkValue },
    });
  };

  // 동의취소 실행
  const cancelhandler = async () => {
    console.log("cancel");
    history.push("/");
  };

  // 전체동의 실행
  const allCheck: IUseInput = useInput<HTMLInputElement>({
    initalChecked: false,
    type: "checkbox",
    onChangeHandler: async (value: IUseChangeParam) => {
      ISignAgreeList.forEach(item => {
        // console.log("1", item.params.checked, value, allCheck.checked);
        if (item.params.setChecked) {
          item.params.setChecked(value.checked as boolean);
        }
      });
    },
  });

  // 필수,선택 동의 실행
  const onChangeHandler = async (value: IUseChangeParam) => {
    let isAllcheck = true;
    ISignAgreeList.forEach(item => {
      if (item.id === value.key) {
        if (!value.checked) {
          isAllcheck = false;
        }
      } else {
        if (!item.params.checked) {
          isAllcheck = false;
        }
      }
    });
    if (allCheck.setChecked) {
      allCheck.setChecked(isAllcheck);
    }
  };
  /* 약관동의 체크박스 Data  */
  const ISignAgreeList: Array<ISignAgree> = [
    {
      id: 0,
      ArgeeText: "[필수] 게임판 서비스 이용약관",
      params: useInput<HTMLInputElement>({
        key: 0,
        initalChecked: false,
        type: "checkbox",
        onChangeHandler: onChangeHandler,
      }),
    },
    {
      id: 1,
      ArgeeText: "[필수] 게임판 개인정보 취급방침",
      params: useInput<HTMLInputElement>({
        key: 1,
        type: "checkbox",
        onChangeHandler: onChangeHandler,
      }),
    },
    {
      id: 2,
      ArgeeText: "[선택] 마케팅 이메일 수신동의",
      params: useInput<HTMLInputElement>({
        key: 2,
        type: "checkbox",
        onChangeHandler: onChangeHandler,
      }),
    },
    {
      id: 3,
      ArgeeText: "[선택] 마케팅 SMS/알림톡 수신동의",
      params: useInput<HTMLInputElement>({
        key: 3,
        type: "checkbox",
        onChangeHandler: onChangeHandler,
      }),
    },
  ];

  useEffect(() => {
    // 전체동의 시 동의 버튼 활성화
    if (allCheck.checked) {
      setdisabled(false);
    } else {
      setdisabled(true);
    }

    // 약관동의 값 생성
    ISignAgreeList.forEach(item => {
      checkValue.push(item.params.checked as boolean);
    });

    // 필수동의 시 버튼 활성화
    if (checkValue[0] === true && checkValue[1] === true) {
      setdisabled(false);
    } else {
      setdisabled(true);
    }
  }, [allCheck.checked, checkValue]);
  return (
    <>
      <SLmainContainer>
        <CenterColumnBox>
          <SLlogoContainer>
            <SLlogoImg src={"/img/ga_3x_logo.png"}></SLlogoImg>
          </SLlogoContainer>
          <SLMidContainer>
            <SLMidSubContainer view={false}>
              <SLMainText>
                회원가입을 위하여 <br></br>서비스약관에 동의해주세요.
              </SLMainText>
              <RowBox>
                <MidcheckBoxArea>
                  <MidCheckButton id="All_agree" {...allCheck}></MidCheckButton>
                  <MidAllckLabel id="All_agree" htmlFor="All_agree">
                    모두 동의합니다.
                  </MidAllckLabel>
                </MidcheckBoxArea>
              </RowBox>
              <RowBox>
                <MidSubText>
                  전체동의는 필수 및 선택정보에 대한 동의도 포함되어 있으며,
                  <br></br>
                  개별적으로도 동의를 선택하실 수 있습니다. 선택항목에 대한
                  동의를
                  <br></br>
                  거부하시는 경우에도 서비스는 이용이 가능합니다.
                </MidSubText>
              </RowBox>
              <MidInLine></MidInLine>
              {ISignAgreeList.map((item, idx) => (
                <RowBox key={idx}>
                  <MidckTopArea>
                    <MidCheckButton {...item.params}></MidCheckButton>
                    <MidckLabel>{item.ArgeeText}</MidckLabel>
                  </MidckTopArea>
                </RowBox>
              ))}
            </SLMidSubContainer>
            <AgreeButton
              disabled={disabled}
              onClick={AgreeHandler.bind(this, "/sign/sign")}
            >
              <AgreeButtonText>동의함</AgreeButtonText>
            </AgreeButton>
            <AgreeCancel onClick={cancelhandler}>동의안함</AgreeCancel>
          </SLMidContainer>
        </CenterColumnBox>
      </SLmainContainer>
    </>
  );
};
export default SignAgree;
