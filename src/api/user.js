/* eslint-disable no-else-return */
/* eslint-disable no-plusplus */
/* eslint-disable camelcase */
/* eslint-disable arrow-body-style */
import request from './base/request';
import storage from './base/storage';

const sign_in_email = (form) => request.post('/api/users/login', form);
const sign_up_email = (form) => request.post('/api/users/register', form);



const _expObject = {
  sign_in_email,
  sign_up_email

};
export default _expObject;
