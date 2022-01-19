import type { ReactElement } from 'react';
import Header from '../../../components/layouts/Header';
import Layout from '../../../components/layouts/Layout';

function AllWorkPage() {
  return (
    <div>
      <h1>作品一覧</h1>
    </div>
  );
}

AllWorkPage.getLayout = (page: ReactElement) => {
  return (
    <>
      <Header />
      <Layout title="作品を探す">{page}</Layout>
    </>
  );
};

export default AllWorkPage;
