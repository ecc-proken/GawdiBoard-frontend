import type { ReactElement } from 'react';
import Layout from '../../../components/layouts/Layout';

function OfferDetailPage() {
  return (
    <div>
      <h1>募集詳細</h1>
    </div>
  );
}

OfferDetailPage.getLayout = (page: ReactElement) => {
  return <Layout title="募集の詳細">{page}</Layout>;
};

export default OfferDetailPage;
