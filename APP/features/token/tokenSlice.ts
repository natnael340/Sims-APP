import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TokenState {
  id: number | 0;
  token: string;
  user: {
    fullName: string;
    sid: string;
    image: string;
  } | null;
}
const initialState: TokenState = {
  id: 0,
  token: "",
  user: null,
};
type login = {
  username: string;
  password: string;
};

const tokenSlice = createSlice({
  name: "status",
  initialState,
  reducers: {
    set(state, action: PayloadAction<string>) {
      state.token = action.payload || "";
    },
    user(
      state,
      action: PayloadAction<{ fullName: string; sid: string; image: string }>
    ) {
      state.user = action.payload;
    },
  },
});

export const { set, user } = tokenSlice.actions;
export default tokenSlice.reducer;
