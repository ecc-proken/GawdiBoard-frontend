import type { ReactElement } from 'react';
import Layout from '../../../components/layouts/Layout';

function AllOffersPage() {
  return (
    <div>
      <h1>募集一覧</h1>
    </div>
  );
}

AllOffersPage.getLayout = (page: ReactElement) => {
  return <Layout title="募集を探す">{page}</Layout>;
};

export default AllOffersPage;
