import { getAuthToken } from '../utils/auth';

export default function headerCommon() {
  const header = {
    'Content-Type': 'application/json',
    Authorization: getAuthToken(),
  };
  return header;
}
