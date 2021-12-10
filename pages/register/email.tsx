import type { ReactElement } from 'react';
import Layout from '../../components/layouts/Layout';

function RegisterEmailPage() {
  return (
    <div>
      <h1>メールアドレス登録</h1>
    </div>
  );
}

RegisterEmailPage.getLayout = (page: ReactElement) => {
  return <Layout title="メールアドレスを登録する">{page}</Layout>;
};

export default RegisterEmailPage;
