import { AppBar, Box, Typography } from "@material-ui/core";
import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import styled from "styled-components";
import { css } from "styled-components";
import { Button } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";

const AppBarContainer = styled(AppBar)({
  display: "flex",
});

const ToolBarContainer = styled(Toolbar)({
  display: "flex",
  maxWidth: "1280px",
  height: "80px",
  justifyContent: "space-between",
});

// header 왼쪽 이미지 영역
const LogoContainer = styled(Box)({
  alignItems: "center",
  display: "flex",
});

// header 오른쪽 영역
const BedgeContainer = styled(Box)({
  display: "flex",
  justifyContent: "flex-end",
  maxWidth: "400px",
});

// header 메뉴 항목
const TopMenu = styled(Typography)({
  height: "21px",
  fontSize: "18px",
  fontWeight: 500,
  lineHeight: "1.17",
  color: "#000",
  cursor: "pointer",
  "&:nth-child(1n + 2)": {
    marginLeft: "40px",
  },
  "&:hover": {
    color: "#FF0000",
  },
});

// header 로그인 버튼
const LoginBar = styled(Button)({
  width: "120px",
  height: "40px",
  padding: "10px 37px",
  borderRadius: "24px",
  boxShadow: "0 3px 6px 0 rgba(0, 0, 0, 0.16)",
  backgroundColor: "#24201e",
  color: "white",
  cursor: "pointer",
});

// header 로그인 Text
const LoginText = styled(Typography)({
  width: "50px",
  height: "16px",
  fontSize: "14px",
  fontWeight: 300,
  textAlign: "center",
  margin: "0 auto",
});

// header 회원가입 버튼
const RegisterBar = styled(Button)({
  padding: "12px 32px",
  borderRadius: "24px",
  marginLeft: "8px",
  boxShadow: "0 3px 6px 0 rgba(0, 0, 0, 0.16)",
  backgroundColor: "#f5921f",
  cursor: "pointer",
});

// header 회원가입 Text
const RegisterText = styled(Typography)({
  width: "60px",
  height: "16px",
  color: "#000000",
  textAlign: "center",
  fontSize: "14px",
  fontWeight: 700,
});

interface ImageProps {
  opacity: number;
  disabled: boolean;
}

const Image = styled.img<ImageProps>`
  width: 64px;
  height: 34px;
  object-fit: contain;
  margin-top: 20px;
  opacity: ${props => props.opacity};
  ${props => {
    if (props.disabled) {
      return css`
        cursor: pointer;
      `;
    } else {
      return css``;
    }
  }}
`;

interface cateLink {
  link: string;
}

function categoryLink(obj: cateLink) {
  console.log(obj.link);
}

// header 메뉴 인터페이스
export interface ICategoryItem {
  id: number;
  name: string;
  link: string;
}

// header 메뉴 Data
export const categoryList: Array<ICategoryItem> = [
  {
    id: 0,
    name: "대회",
    link: "/main",
  },
  {
    id: 1,
    name: "팀",
    link: "/",
  },
  {
    id: 2,
    name: "랭킹",
    link: "/",
  },
  {
    id: 3,
    name: "게임판TV",
    link: "/",
  },
  {
    id: 4,
    name: "대회만들기",
    link: "/",
  },
];

/* goPage 인터페이스 호출 */
const TopBar: React.FC = () => {
  const history = useHistory();
  const menuClickHandler = (
    item: ICategoryItem,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    console.log(item, e);
    history.push(item.link);
  };
  const SignClickHandler = (Menu: string) => {
    console.log(Menu);
    history.push(Menu);
  };
  return (
    <div>
      <AppBarContainer position={"static"} color={"transparent"} elevation={0}>
        <ToolBarContainer color={"transparent"}>
          <LogoContainer>
            <Link to="/">
              <Image
                src={"/img/ga_3x_logo.png"}
                opacity={0.9}
                disabled={true}
              ></Image>
            </Link>
            {categoryList.map((item, idx) => (
              <TopMenu
                variant={"h6"}
                key={idx}
                onClick={() => categoryLink(item)}
              >
                <Button onClick={menuClickHandler.bind(this, item)}>
                  {item.name}
                </Button>
              </TopMenu>
            ))}
          </LogoContainer>
          <BedgeContainer>
            <LoginBar onClick={SignClickHandler.bind(this, "/login/index")}>
              <LoginText>로그인</LoginText>
            </LoginBar>
            <RegisterBar onClick={SignClickHandler.bind(this, "/signAgree")}>
              <RegisterText>회원가입</RegisterText>
            </RegisterBar>
          </BedgeContainer>
        </ToolBarContainer>
      </AppBarContainer>
    </div>
  );
};

export default TopBar;
