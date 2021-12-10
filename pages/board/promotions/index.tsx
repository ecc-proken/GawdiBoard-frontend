import type { ReactElement } from 'react';
import Layout from '../../../components/layouts/Layout';

function AllPromotionsPage() {
  return (
    <div>
      <h1>宣伝一覧</h1>
    </div>
  );
}

AllPromotionsPage.getLayout = (page: ReactElement) => {
  return <Layout title="宣伝を探す">{page}</Layout>;
};

export default AllPromotionsPage;
