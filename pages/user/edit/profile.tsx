import type { ReactElement } from 'react';
import Layout from '../../../components/layouts/Layout';

function EditProfilePage() {
  return (
    <div>
      <h1>ユーザー情報変更</h1>
    </div>
  );
}

EditProfilePage.getLayout = (page: ReactElement) => {
  return <Layout title="ユーザー情報を変更する">{page}</Layout>;
};

export default EditProfilePage;
