import type { ReactElement } from 'react';
import Layout from '../../components/layouts/Layout';

function PostWorkPage() {
  return (
    <div>
      <h1>作品投稿</h1>
    </div>
  );
}

PostWorkPage.getLayout = (page: ReactElement) => {
  return <Layout title="新しい作品を投稿する">{page}</Layout>;
};

export default PostWorkPage;
