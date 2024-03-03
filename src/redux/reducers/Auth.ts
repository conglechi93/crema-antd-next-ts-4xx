export type InitialStateType = {
  loading: boolean;
  profile: any;
  error: any;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  currentUser: any | null;
  varsId: null | string;
  listProfile: any[];
};

const initialState: InitialStateType = {
  loading: false,
  profile: null,
  error: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  currentUser: null,
  varsId: null,
  listProfile: [],
};

const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    default:
      return state;
  }
};
export default authReducer;
