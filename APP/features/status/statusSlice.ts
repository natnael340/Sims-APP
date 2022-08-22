import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface StatusState {
  status: {
    sid: string;
    year: number;
    semseter: number;
    sgpa: number;
    cp: number;
  }[];
  courses: {
    id: number;
    course: string;
    courseName: string;
    courseCategory: string;
    grade: string;
    cp: number;
    year: number;
    semseter: number;
  }[];
  dorm:
    | {
        bedNo: number;
        buildingName: string;
        buildingNo: string;
        campus: string;
        dorm: string;
        floor: string;
      }
    | undefined;
}
const initialState: StatusState = {
  status: [],
  courses: [],
  dorm: undefined,
};

const statusSlice = createSlice({
  name: "status",
  initialState,
  reducers: {
    addStatus: (
      state,
      action: PayloadAction<
        {
          sid: string;
          year: number;
          semseter: number;
          sgpa: number;
          cp: number;
        }[]
      >
    ) => {
      state.status = [...action.payload];
    },
    addCourses: (
      state,
      action: PayloadAction<
        {
          id: number;
          course: string;
          courseName: string;
          courseCategory: string;
          grade: string;
          cp: number;
          year: number;
          semseter: number;
        }[]
      >
    ) => {
      state.courses = [...action.payload];
    },
    addDorm: (
      state,
      action: PayloadAction<{
        bedNo: number;
        buildingName: string;
        buildingNo: string;
        campus: string;
        dorm: string;
        floor: string;
      }>
    ) => {
      state.dorm = action.payload;
    },
  },
});

export const { addStatus, addCourses, addDorm } = statusSlice.actions;
export default statusSlice.reducer;
