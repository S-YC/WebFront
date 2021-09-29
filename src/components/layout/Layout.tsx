import React, { ReactNode, useEffect } from "react";
import axios from "axios";
// import TopBar from "./TopBar";
import TopBar from "./ycseong";
import FooterBar from "./Footer";
// import { link } from "fs";
// import { PinDropSharp } from "@material-ui/icons";

type Props = {
  children?: ReactNode;
};

const Layout: React.FC = ({ children }: Props) => {
  // 로딩바 설정
  useEffect(() => {
    axios.interceptors.request.use(
      function (config) {
        // on()
        return config;
      },
      function (error) {
        // off()
        return Promise.reject(error);
      }
    );

    axios.interceptors.response.use(
      function (config) {
        // on()
        return config;
      },
      function (error) {
        // off()
        return Promise.reject(error);
      }
    );
  }, []);

  return (
    <div>
      <div>
        <TopBar />
        {children}
      </div>
      <FooterBar />
    </div>
  );
};

export default Layout;
