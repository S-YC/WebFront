// file: src/App.js
import React, { Component } from "react";

class App extends Component {
  state = {
    information: [
      {
        id: 0,
        name: "대회",
        link: "/",
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
    ],
  };
}

export default App;
