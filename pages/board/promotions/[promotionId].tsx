import type { ReactElement } from 'react';
import Header from '../../../components/layouts/Header';
import Layout from '../../../components/layouts/Layout';

function PromotionDetailPage() {
  return (
    <div>
      <h1>宣伝詳細</h1>
    </div>
  );
}

PromotionDetailPage.getLayout = (page: ReactElement) => {
  return (
    <>
      <Header />
      <Layout title="宣伝の詳細">{page}</Layout>
    </>
  );
};

export default PromotionDetailPage;
