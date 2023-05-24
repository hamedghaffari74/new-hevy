import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addRestTimer } from "../../../store/slice/exerciseSlice";
import { setUpdateRestTimer } from "../../../store/slice/routinesdaySlice";
import {
  InputAdornment,
  TextField,
} from "@mui/material";

const InputAddRestTimer = ({ Id, separator, amount }) => {
  const [restTimer, setRestTimer] = useState(amount);
  const dispatch = useDispatch();

  const handleChangeTimer = (e) => {
    setRestTimer(e.target.value);
  };

  useEffect(() => {
    if (separator == 1) {
      dispatch(addRestTimer({ Id, restTimer }));
    }
    if (separator == 2) {
      dispatch(setUpdateRestTimer({ Id, restTimer }));
    }
  }, [restTimer]);

  return (
    <div className="w-36 mt-1">
      <TextField
        value={restTimer}
        onChange={handleChangeTimer}
        label="Rest Time"
        id="outlined-start-adornment"
        type="tel"
        sx={{ m: 1, minwidth: 5 }}
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment className="mt-5" position="start" value={restTimer}>
              S
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};

export default InputAddRestTimer;
