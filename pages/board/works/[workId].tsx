import type { ReactElement } from 'react';
import Layout from '../../../components/layouts/Layout';

function WorkDetailPage() {
  return (
    <div>
      <h1>作品詳細</h1>
    </div>
  );
}

WorkDetailPage.getLayout = (page: ReactElement) => {
  return <Layout title="作品の詳細">{page}</Layout>;
};

export default WorkDetailPage;
