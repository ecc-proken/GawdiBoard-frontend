import { useRouter } from 'next/router';
import type { ReactElement } from 'react';
import Layout from '../../components/layouts/Layout';
import OfferForm from '../../components/OfferForm';
import { useAddOffer } from '../../hooks/requests/offers';

function PostOfferPage() {
  const { mutate, error, isLoading } = useAddOffer();

  const router = useRouter();

  return (
    <div>
      <h1>募集投稿</h1>
      <OfferForm
        onSubmit={(newOfferAttributes) => {
          mutate(newOfferAttributes, {
            onSuccess: () => {
              router.push('/board/offers');
            },
          });
        }}
        submitButton={() => <button disabled={isLoading}>投稿</button>}
        cancelButton={({ handleCancel }) => (
          <button type="button" onClick={handleCancel} disabled={isLoading}>
            キャンセル
          </button>
        )}
      />
      {error && (
        <p role="alert">投稿中にエラーが発生しました。詳細: {error.message}</p>
      )}
      <style jsx>
        {`
          div:not(first-child) {
            margin: 16px;
          }
          label {
            vertical-align: top;
            margin-right: 8px;
          }
          .tag {
            margin: 4px;
            padding: 4px;
            background-color: lightgray;
            white-space: nowrap;
          }
        `}
      </style>
    </div>
  );
}

PostOfferPage.getLayout = (page: ReactElement) => {
  return <Layout title="新しい募集を投稿する">{page}</Layout>;
};

export default PostOfferPage;
