import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authToken } from 'src/config';
import { storage } from 'src/utils';
interface UserState {
  userId: number | null;
  username: string | null;
  token: string | null;
}

const initialState: UserState = {
  userId: null,
  username: null,
  token: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state: UserState) => {
      state.userId = null;
      state.token = null;
      state.username = null;
    },
    mockLogin: (
      state: UserState,
      action: PayloadAction<{ token: string; username: string; userId: number }>
    ) => {
      state.userId = action.payload.userId;
      state.token = action.payload.token;
      state.username = action.payload.username;
      storage.setItem(authToken, action.payload.token);
    },
  },
  extraReducers: {},
});
