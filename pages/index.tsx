import type { NextPage } from 'next';
import Head from 'next/head';
import { useQuery } from 'react-query';

const Home: NextPage = () => {
  const { data, error, isLoading } = useQuery('test', async () => {
    const res = await fetch('/mock-test').catch((error) => {
      throw new Error('通信中に問題が起こりました。詳細: ' + error.message);
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.message ?? 'エラーがおこったよ');
    }

    return res.json();
  });

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
