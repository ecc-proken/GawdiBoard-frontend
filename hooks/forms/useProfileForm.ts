import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useForm } from 'react-hook-form';
import type { DefaultValues } from 'react-hook-form';
import * as yup from 'yup';

type FormValue = {
  user_name: string;
  link: string;
  self_introduction: string;
};

const schema = yup.object({
  user_name: yup.string().required('ユーザーネームは必須です'),
  link: yup.string().url('有効なURLを入力してください'),
  self_introduction: yup.string(),
});

function useProfileForm(defaultValues?: DefaultValues<FormValue>) {
  return useForm<FormValue>({
    resolver: yupResolver(schema),
    defaultValues: defaultValues,
  });
}

export { useProfileForm };
