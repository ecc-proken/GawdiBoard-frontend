import type { ReactElement } from 'react';
import Layout from '../../components/layouts/Layout';

function PostOfferPage() {
  return (
    <div>
      <h1>募集投稿</h1>
    </div>
  );
}

PostOfferPage.getLayout = (page: ReactElement) => {
  return <Layout title="新しい募集を投稿する">{page}</Layout>;
};

export default PostOfferPage;
