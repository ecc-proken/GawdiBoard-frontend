import type { ReactElement } from 'react';
import Layout from '../../../components/layouts/Layout';

function EditEmailPage() {
  return (
    <div>
      <h1>メールアドレス変更</h1>
    </div>
  );
}

EditEmailPage.getLayout = (page: ReactElement) => {
  return <Layout title="メールアドレスを変更する">{page}</Layout>;
};

export default EditEmailPage;
