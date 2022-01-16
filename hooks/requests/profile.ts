import { useMutation } from 'react-query';
import { jsonClient } from '../../utils/httpClient';

type User = {
  student_number: number;
  user_name: string;
  email?: string;
  link?: string;
  self_introduction: string;
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

function useEditUser() {
  return useMutation<EditUserResponse, Error, EditUserRequest>(
    (newUser) => {
      return jsonClient('/mock/user/edit', {
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
      return jsonClient('/mock/user/edit-email', {
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
export { useEditUser, useEditEmail };
