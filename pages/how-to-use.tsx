import type { ReactElement } from 'react';
import Layout from '../components/layouts/Layout';

function HowToUsePage() {
  return (
    <div>
      <h1>当サイトのサイト使い方</h1>
    </div>
  );
}

HowToUsePage.getLayout = (page: ReactElement) => {
  return <Layout title="当サイトの使い方">{page}</Layout>;
};

export default HowToUsePage;
