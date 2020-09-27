import React from "react";
import "./styles.css";

import TopBar from "./Components/TopBar";
import CourseFinderBody from "./Components/CourseFinderBody";
import BottomBar from "./Components/BottomBar";

export default function App() {
  return (
    <div className="App">
      <TopBar />
      <CourseFinderBody />
      <BottomBar />
    </div>
  );
}
