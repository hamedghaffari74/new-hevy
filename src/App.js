import "../src/App.css";
import Navbar from "./component/layout/navbar/navbar";
import Home from "./component/layout/home/home";
import React, { useEffect } from "react";
import LabelBottomNavigation from "./component/layout/buttomNavigation/buttomNavigation";
import { remove } from "./store/slice/routinesdaySlice";
import { Remove } from "./store/slice/exerciseSlice";
import { rEmove } from "./store/slice/routineSlice";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();

  return (
    <div className="h-[80vh]">
      <Navbar />
      <Home />
      <LabelBottomNavigation />
    </div>
  );
}

export default App;
