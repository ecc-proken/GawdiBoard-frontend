import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Gawdi Board</title>
        <meta name="description" content="ECCコン専用の掲示板" />
      </Head>
      <main>
        <h1>Gawdi Boardへようこそ</h1>
      </main>
      <footer>ここはフッターかもしれないよ</footer>
      <style jsx>{`
        h1 {
          color: violet;
        }
      `}</style>
    </div>
  );
};

export default Home;
