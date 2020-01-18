const initialState = {
  reduxTokenAuth: {
    currentUser: {
      isLoading: false,
      isSignedIn: false,
      attributes: {
        name: null, 
        email: null,
        department: null
      },
    },
  }
};

export default initialState;