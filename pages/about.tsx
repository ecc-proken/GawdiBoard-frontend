import type { ReactElement } from 'react';
import Layout from '../components/layouts/Layout';

function AboutPage() {
  return (
    <div>
      <h1>当サイトについて</h1>
    </div>
  );
}

AboutPage.getLayout = (page: ReactElement) => {
  return <Layout title="当サイトについて">{page}</Layout>;
};

export default AboutPage;
