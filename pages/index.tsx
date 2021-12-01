import type { NextPage } from 'next';
import Head from 'next/head';
import { useQuery } from 'react-query';
import { jsonClient } from '../utils/httpClient';

const Home: NextPage = () => {
  const { data, error, isLoading } = useQuery('test', () =>
    jsonClient('/mock-test', {
      params: { a: 'hello', b: ['1', '2', '3'] },
    })
  );

  return (
    <div>
      <Head>
        <title>Gawdi Board</title>
        <meta name="description" content="ECCコン専用の掲示板" />
      </Head>
      <main>
        <h1>Gawdi Boardへようこそ</h1>
        {isLoading && <p>ロード中だよ...</p>}
        {data && <p>{data.msg}</p>}
        {error && (
          <p role="alert" className="error">
            エラーが起こったよ
          </p>
        )}
      </main>
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
};

export default Home;
