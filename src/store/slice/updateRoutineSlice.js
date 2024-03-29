import { createSlice } from "@reduxjs/toolkit";
import { data } from "autoprefixer";
import { useSelector, useDispatch } from "react-redux";

const updateRoutineSlice = createSlice({
  name: "updateRoutine",
  initialState: {
    list: [],
  },
  reducers: {
    createUpdateRoutes: (state, { payload }) => {
      state.list = {
        title: payload,
        exercises: [],
      };
    },

    setUpdateRoutes: (state, { payload }) => {
      const { newList } = payload;
      newList.routine_items.map((item) =>
        state.list.exercises.push({
          exercise_id: item.exercise_id,
          note: item.note??null,
          order: 1,
          rest_timer: item.rest_timer ?? null,
          sets: item.routine_sets.map((set) => set.amount),
          super_set: item.super_set ? item.super_set : [],
        })
      );
    },
  },
});

export const { createUpdateRoutes, setUpdateRoutes } =
  updateRoutineSlice.actions;

export default updateRoutineSlice.reducer;
