import type { ReactElement } from 'react';
import Layout from '../../components/layouts/Layout';

function UserProfilePage() {
  return (
    <div>
      <h1>ユーザー詳細</h1>
    </div>
  );
}

UserProfilePage.getLayout = (page: ReactElement) => {
  return <Layout title="ユーザーのプロフィール">{page}</Layout>;
};

export default UserProfilePage;
