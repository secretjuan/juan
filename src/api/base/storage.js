import SecureLS from 'secure-ls';

const ls = new SecureLS({ encodingType: 'aes' });

const key = 'token';
const user = 'user';

const storeToken = (token) => {
  try {
    ls.set(key, token);
  } catch (error) {
    console.log('Error storing the auth token', error);
  }
};

const storeUser = (data) => {
  try {
    ls.set(user, JSON.stringify(data));
  } catch (error) {
    console.log('Error storing the user', error);
  }
};

// eslint-disable-next-line consistent-return
const getToken = () => {
  try {
    return ls.get(key);
  } catch (error) {
    console.log('Error getting the auth token', error);
  }
};

const getUser = async () => {
  try {
    return await ls.get(user);
  } catch (error) {
    console.log('Error getting the user', error);
    return false;
  }
};

const remove = () => {
  try {
    ls.remove('user');
  } catch (error) {
    console.log('Error removing the token', error);
  }
};

const _expObject = {
  getToken,
  getUser,
  remove,
  storeToken,
  storeUser
};

export default _expObject;
