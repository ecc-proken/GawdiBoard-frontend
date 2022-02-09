import { useQuery } from 'react-query';
import { API_HOST } from '../../utils/configs';
import { jsonClient } from '../../utils/httpClient';
import type { User } from './profile';

type GetLoginUserResponse = {
  user: User;
};

function useLoginUser() {
  return useQuery<GetLoginUserResponse, Error>(
    ['auth'],
    () => jsonClient(API_HOST + '/user/whoami'),
    {
      staleTime: Infinity,
      cacheTime: Infinity,
    }
  );
}

export { useLoginUser };
