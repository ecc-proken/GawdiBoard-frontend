import type { ReactElement } from 'react';
import Layout from '../../components/layouts/Layout';

function PostPromotionPage() {
  return (
    <div>
      <h1>宣伝投稿</h1>
    </div>
  );
}

PostPromotionPage.getLayout = (page: ReactElement) => {
  return <Layout title="新しい宣伝を投稿する">{page}</Layout>;
};

export default PostPromotionPage;
