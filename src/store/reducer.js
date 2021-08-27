export default function reducer(state, action) {
  switch (action.type) {
    case 'LOGIN_USER':
      return {
        ...state,
        user: action.payload.user,
      };

    case 'LOGOUT_USER':
      return {
        ...state,
        user: null,
      };

    case 'GET_CONTENT':
      return {
        ...state,
        items: action.payload.items,
      };

    case 'CREATE_CART':
      return {
        ...state,
        items: action.payload.items,
      };

    case 'DELETE_TODO':
      return {
        ...state,
        items: state.items.map((item) => {
          return {
            ...item,
            ...action.payload.items,
          };
        }),
      };

    case 'UPDATE_CART':
      return {
        ...state,
        items: state.items.map((item) => {
          return {
            ...item,
            ...action.payload.items,
          };
        }),
      };

      case 'SET_ID':
        return {
          ...state,
          Home: state.Home.push(action.payload.id)
          // todos: state.todos.push(action.payload.id)
        };

    default:
      return state;
  }
}
