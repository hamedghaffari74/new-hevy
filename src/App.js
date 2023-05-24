import "../src/App.css";
import Navbar from "./component/layout/navbar/navbar";
import Home from "./component/layout/home/home";
import React from "react";
import LabelBottomNavigation from "./component/layout/buttomNavigation/buttomNavigation";

function App() {
  return (
    <div className="h-[80vh]">
      <Navbar />
      <Home />
      <LabelBottomNavigation />
    </div>
  );
}

export default App;
