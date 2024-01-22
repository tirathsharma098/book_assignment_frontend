import { useCallback, useState } from 'react';
import { AXIOS_ERROR_CODE } from '../utils/constants';
import { toast } from 'react-toastify';
const toastOptions = {
  position: toast.POSITION.TOP_RIGHT,
};
export default function useHttp() {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const apiFunc = useCallback(async (httpFunc, config, apiType = 'GET') => {
    try {
      setIsLoading(true);
      // await new Promise((resolve) => setTimeout(resolve, 4000));
      const responseGot = await httpFunc(config);
      if (responseGot.data?.success === false) {
        toast.error(responseGot.data.message, toastOptions);
      } else if (responseGot.data?.success === true) {
        if (apiType !== 'GET') toast.success(responseGot.data.message, toastOptions);
        setResponse(responseGot.data.data);
      } else throw new Error('Something went wrong');
      setIsLoading(false);
    } catch (err) {
      console.log('ERROR occurred while fetching data');
      setIsLoading(false);
      if (err?.code === AXIOS_ERROR_CODE.ERR_NETWORK) toast.error(err?.message, toastOptions);
      toast.error('Something went wrong', toastOptions);
    }
  }, []);
  return {
    response,
    isLoading,
    apiFunc,
  };
}

// const response = await axios({
//     url: API.endpoint + config.url,
//     method: config.method,
//     data: {...config.data},
//     params: {
//         ...config.queryParams,
//     },
//     headers: {
//         ...config.headers
//     },
// });
