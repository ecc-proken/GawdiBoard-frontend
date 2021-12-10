import type { ReactElement } from 'react';
import Layout from '../../../components/layouts/Layout';

function EditWorkPage() {
  return (
    <div>
      <h1>作品編集</h1>
    </div>
  );
}

EditWorkPage.getLayout = (page: ReactElement) => {
  return <Layout title="作品を編集する">{page}</Layout>;
};

export default EditWorkPage;
