import React from "react";
import Navbar from "../../layout/navbar/navbar";
import CardRoutineDay from "../../layout/card/cardRoutineDay";

const RoutinesDay = () => {
  return (
    <div className="routin-style min-h-[80vh] ">
      <Navbar />
      <div className="button-update"></div>
      <div className=" md:flex routine-day">
        <CardRoutineDay />
      </div>
    </div>
  );
};

export default RoutinesDay;
