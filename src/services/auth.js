import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const getUserToken = () => {
  const userToken = cookies.get('userToken');
  return userToken;
};

export const setUserToken = (token) => {
  cookies.set('userToken', token, { path: '/' });
};

export const isLoggedIn = () => !!getUserToken();
