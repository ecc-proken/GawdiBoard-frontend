import { useQuery } from 'react-query';
import { jsonClient } from '../../utils/httpClient';
import type { User } from './profile';

type GetLoginUserResponse = {
  user: User;
};

function useLoginUser() {
  return useQuery<GetLoginUserResponse, Error>(
    ['auth'],
    () => jsonClient('/user/whoami'),
    {
      staleTime: Infinity,
      cacheTime: Infinity,
    }
  );
}

export { useLoginUser };
