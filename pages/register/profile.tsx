import type { ReactElement } from 'react';
import Layout from '../../components/layouts/Layout';

function RegisterProfilePage() {
  return (
    <div>
      <h1>ユーザー情報登録</h1>
    </div>
  );
}

RegisterProfilePage.getLayout = (page: ReactElement) => {
  return <Layout title="ユーザー情報を登録する">{page}</Layout>;
};

export default RegisterProfilePage;
