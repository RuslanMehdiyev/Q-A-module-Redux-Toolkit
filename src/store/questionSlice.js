import { createSlice } from "@reduxjs/toolkit";

const questionSlice = createSlice({
  name: "questions",
  initialState: {
    value: [],
    answers: [],
  },
  reducers: {
    addQuestion: (state, action) => {
      state.value.push(action.payload);
    },
    addAnswers: (state, action) => {
      state.answers.push(action.payload);
    },
    addRate: (state, action) => {
      let item = state.value.find((e) => e.id === action.payload.id);
      item.rate++;
    },
  },
});

export default questionSlice.reducer;
export const { addQuestion, addAnswers, addRate } = questionSlice.actions;
