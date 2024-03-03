export type InitialStateType = {
  toastProps: {
    type: any;
    message?: string;
    description?: string;
  };
  loadingApp?: boolean;
};

const initialState: InitialStateType = {
  toastProps: {
    type: '',
    message: '',
    description: '',
  },
  loadingApp: false,
};

const appReducer = (state = initialState, action: any) => {
  switch (action.type) {
    default:
      return state;
  }
};
export default appReducer;
