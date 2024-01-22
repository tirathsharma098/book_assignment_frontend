import axios from 'axios';
import { getAuthToken } from './auth';
import { API } from '../config/api/api.config';
import { handleAxiosError, resHandlerNoSuccess } from './responseHandler';

export async function getStandardDropdownLoader() {
  const token = getAuthToken();
  try {
    const res = await axios({
      url: API.endpoint + '/standard/standard-dropdown',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      validateStatus: () => true,
    });
    return resHandlerNoSuccess(res);
  } catch (err) {
    return handleAxiosError(err);
  }
}
