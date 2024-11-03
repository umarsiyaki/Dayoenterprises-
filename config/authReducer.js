const initialState = {
  user: null,
  isAuthenticated: false,
  role: null,
  loginType: null,
  loading: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return { ...state, loading: true };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user

          ,
          role: action.payload.role,
          isAuthenticated: true,
          loginType: action.payload.loginType,
          loading: false,
      };
    case 'LOGIN_FAILURE':
      return { ...state, error: action.payload.error, loading: false };
    case 'LOGOUT':
      return { ...initialState };
    default:
      return state;
  }
};

export default authReducer;