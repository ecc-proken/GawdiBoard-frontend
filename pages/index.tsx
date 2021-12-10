import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import type { ReactElement } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import * as yup from 'yup';
import Layout from '../components/layouts/Layout';
import { jsonClient } from '../utils/httpClient';

type FormValue = {
  keyword: string;
};

const schema = yup
  .object({
    keyword: yup.string().required('ここは絶対に入力してね'),
  })
  .required();

function HomePage() {
  const [keyword, setKeyword] = useState('');
  const { data, error, isLoading } = useQuery(
    'test',
    () =>
      jsonClient('/success', {
        params: { keyword },
      }),
    {
      enabled: keyword.length !== 0,
    }
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValue>({
    resolver: yupResolver(schema),
  });
  const onSubmit = handleSubmit(({ keyword }) => {
    setKeyword(keyword);
  });

  return (
    <div>
      <h1>Gawdi Boardへようこそ</h1>
      <form onSubmit={onSubmit}>
        <input {...register('keyword')}></input>
        {errors.keyword && <span>{errors.keyword.message}</span>}
        <button>押す</button>
      </form>
      {isLoading && <p>ロード中だよ...</p>}
      {data && <p>{data.message}</p>}
      {error && (
        <p role="alert" className="error">
          エラーが起こったよ
        </p>
      )}
      <footer>ここはフッターかもしれないよ</footer>
      <style jsx>{`
        h1 {
          color: violet;
        }
        .error {
          color: red;
        }
      `}</style>
    </div>
  );
}

HomePage.getLayout = (page: ReactElement) => {
  return <Layout title="ホーム">{page}</Layout>;
};

export default HomePage;
