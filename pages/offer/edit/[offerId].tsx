import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import Layout from '../../../components/layouts/Layout';
import OfferForm from '../../../components/OfferForm';
import { useEditOffer, useOffer } from '../../../hooks/requests/offers';

function EditOfferPage() {
  const {
    mutate,
    error: mutateOfferError,
    isLoading: isMutatingOffer,
  } = useEditOffer();

  const router = useRouter();
  const offerId = router.query.offerId as string;

  const {
    data,
    error: getOfferError,
    isLoading: isLoadingOffer,
  } = useOffer({ offer_id: +offerId }, router.isReady);

  const defaultFormValues = data && {
    ...data.offer,
    offer_tag_ids: data.offer.tags.map((tag) => tag.id),
  };

  return (
    <div>
      <h1>募集編集</h1>
      {isLoadingOffer && <p>データをロード中</p>}
      {data && (
        <>
          <OfferForm
            onSubmit={(newOfferAttributes) => {
              const newOffer = Object.assign(newOfferAttributes, {
                offer_id: +offerId,
              });

              mutate(newOffer, {
                onSuccess: () => {
                  router.push('/board/offers');
                },
              });
            }}
            defaultFormValues={defaultFormValues}
            submitButton={() => (
              <button disabled={!router.isReady || isMutatingOffer}>
                編集
              </button>
            )}
            cancelButton={({ handleCancel }) => (
              <button
                type="button"
                onClick={handleCancel}
                disabled={isMutatingOffer}
              >
                キャンセル
              </button>
            )}
          />
          {mutateOfferError && (
            <p role="alert">
              編集中にエラーが発生しました。詳細: {mutateOfferError.message}
            </p>
          )}
        </>
      )}
      {getOfferError && <p role="alert">データの読み込みに失敗しました</p>}
    </div>
  );
}

EditOfferPage.getLayout = (page: ReactElement) => {
  return <Layout title="募集を編集する">{page}</Layout>;
};

export default EditOfferPage;
