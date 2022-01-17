import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useForm } from 'react-hook-form';
import type { DefaultValues } from 'react-hook-form';
import * as yup from 'yup';

type FormValue = {
  email: string;
};

const schema = yup.object({
  email: yup
    .string()
    .required('メールアドレスは必須です')
    .email('有効なメールアドレスを入力してください'),
});

function useEmailForm(defaultValues?: DefaultValues<FormValue>) {
  return useForm<FormValue>({
    resolver: yupResolver(schema),
    defaultValues: defaultValues,
  });
}

export { useEmailForm };
