import { useMutation, useQuery } from 'react-query';
import { API_HOST } from '../../utils/configs';
import { jsonClient } from '../../utils/httpClient';

type User = {
  student_number: number;
  user_name: string;
  email?: string;
  link?: string;
  self_introduction: string;
};

type GetUserRequest = {
  student_number: string;
};
type GetUserResponse = {
  user: User;
};

type EditUserRequest = {
  user_name: string;
  link?: string;
  self_introduction?: string;
};
type EditUserResponse = {
  user: User;
};

type EditEmailRequest = {
  email: string;
};
type EditEmailResponse = {
  user: User;
};

function useUser({ student_number }: GetUserRequest, enabled = true) {
  return useQuery<GetUserResponse, Error>(
    ['user', student_number],
    () =>
      jsonClient(API_HOST + '/user/single', {
        params: { student_number },
      }),
    {
      enabled,
    }
  );
}

function useEditUser() {
  return useMutation<EditUserResponse, Error, EditUserRequest>(
    (newUser) => {
      return jsonClient(API_HOST + '/user/edit', {
        method: 'POST',
        body: { ...newUser },
      });
    },
    {
      onSuccess: (data) => {
        // TODO ログインユーザーをアップデートする
      },
    }
  );
}

function useEditEmail() {
  return useMutation<EditEmailResponse, Error, EditEmailRequest>(
    (newEmail) => {
      return jsonClient(API_HOST + '/user/edit-email', {
        method: 'POST',
        body: { ...newEmail },
      });
    },
    {
      onSuccess: () => {
        // TODO ログインユーザーのemailをアップデートする
      },
    }
  );
}
export type { User };
export { useUser, useEditUser, useEditEmail };
