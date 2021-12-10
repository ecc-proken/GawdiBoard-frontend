import type { ReactElement } from 'react';
import Layout from '../../../components/layouts/Layout';

function EditOfferPage() {
  return (
    <div>
      <h1>募集編集</h1>
    </div>
  );
}

EditOfferPage.getLayout = (page: ReactElement) => {
  return <Layout title="募集を編集する">{page}</Layout>;
};

export default EditOfferPage;
