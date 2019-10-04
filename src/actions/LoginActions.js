import * as constand from '../constant';
import { 
  LOGIN_PROCESS, 
  LOGIN_SUCCESS, 
  CHECK_ISAUTH,
  UPDATE_USERLIST } from '../utilities';

export function login(username, password) {
  return (dispatch, getState) => {
    let user = {username: username, password: password};
    return authrizationCheck(user)
      .then(response => {
          if(response)
          {
            dispatch({
              type:LOGIN_SUCCESS,
              payload:response.userData
            })
            user.authdata = window.btoa(response.username + ':' + response.password);
            localStorage.setItem('user', JSON.stringify(user));
          }
          return response;
      });
  }
}

function authrizationCheck(user)
{
  let userData = constand.USERDATA;
  return new Promise((resolve, reject) => { 
    if(userData.username === user.username && userData.password === user.password)
    {
      resolve({ ok: true, text: 'Login successfully', userData: userData });
    }else{
      reject('Username or password is incorrect');
    }
  });
}

export function isAuth() {
  var is_auth = (localStorage.getItem('user')) ? true : false;

  return (dispatch, getState) => {
    dispatch({
      type: CHECK_ISAUTH,
      payload: is_auth
    });
  }
}


export function logout() {
  // remove user from local storage to log user out
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => { 
      // remove all
      localStorage.clear();
      isAuth();
      dispatch({
        type: LOGIN_PROCESS,
        payload: false
      });
      resolve({ ok: true, text: 'Successfully logout' });
    })
  }
}

export function getUserData() {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => { 
      dispatch({
        type:UPDATE_USERLIST,
        payload:constand.USERLIST.user
      })
      resolve({ ok: true, text: 'success' });
    });
  }
}
