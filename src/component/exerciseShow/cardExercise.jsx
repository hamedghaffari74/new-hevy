import React from "react";
import { useSelector } from "react-redux";
import Fit1 from "../../video/Fit1.mp4";

const CardExercise = () => {
  const list = useSelector((state) => state.exerciseShow.list);
  return (
    <div>
      <div className="  flex">
        <>
          {/* {?.type == 'img' ? */}
          {/* <img className='border-2 py-10 rounded-lg w-5/5' alt="Travis Howard" src={'option.avatar'} /> */}
          <video className="border-2 rounded-lg w-5/5" autoPlay loop muted>
            <source src={Fit1} type="video/mp4" />
          </video>
          {/* } */}
        </>
      </div>
    </div>
  );
};

export default CardExercise;
