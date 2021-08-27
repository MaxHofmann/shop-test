import * as api from '../api';

/* Auth */
export function logInUser(email, password) {
  return api.logInUser(email, password).then(() => ({}));
}

export function signOutUser() {
  return api.signOutUser().then(() => ({}));
}

export function registerUser(email, password) {
  return api.registerUser(email, password).then(() => ({}));
}

export function initAuth() {
  return (dispatch) =>
    api.initAuth((user) => {
      return user
        ? dispatch({
            type: 'LOGIN_USER',
            payload: {
              user,
            },
          })
        : dispatch({
            type: 'LOGOUT_USER',
          });
    });
}

export function getCollection() {
  return api.getCollection().then((items) => ({
    type: 'GET_CONTENT',
    payload: {
      items,
    },
  }));
}

export function createCart(data) {
  return api.createCart(data).then((items) => ({
    type: 'CREATE_CART',
    payload: {
      items,
    },
  }));
}

export function deleteTodo(IdCart) {
  return api.deleteTodo(IdCart).then((IdCart) => ({
    type: 'DELETE_TODO',
    payload: {
      IdCart,
    },
  }));
}

export function updateCart(data) {
  return api.updateCart(data)
      .then(item => ({
          type: 'UPDATE_CART',
          payload: {
            item
          }
      }));
}


export function setId(id) {
  return api.setId({
    type: 'SET_ID',
    payload: {
      id
    },
  })
}
