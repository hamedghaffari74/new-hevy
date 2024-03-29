import { createSlice } from "@reduxjs/toolkit";
import { data } from "autoprefixer";
import { useSelector, useDispatch } from "react-redux";

const routineSlice = createSlice({
  name: "routine",
  initialState: {
    list: [],
  },
  reducers: {
    createRoutes: (state, { payload }) => {
      const { title } = payload;
      state.list = {
        title: title,
        exercises: [],
      };
    },

    setRoutes: (state, { payload }) => {
      const { item } = payload;

      state.list.exercises.push({
        exercise_id: item.id,
        note: item.note,
        order: 1,
        sets: item.sets,
        super_set: item.super_set,
        rest_timer: item.restTimer,
      });
    },

    removeRoutine: (state, { payload }) => {
      state.list = [];
    },
  },
});

export const { createRoutes, setRoutes, removeRoutine } = routineSlice.actions;

export default routineSlice.reducer;
