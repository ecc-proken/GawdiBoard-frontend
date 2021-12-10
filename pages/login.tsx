import type { ReactElement } from 'react';
import Layout from '../components/layouts/Layout';

function LoginPage() {
  return (
    <div>
      <h1>ログイン</h1>
    </div>
  );
}

LoginPage.getLayout = (page: ReactElement) => {
  return <Layout title="ログイン">{page}</Layout>;
};

export default LoginPage;
