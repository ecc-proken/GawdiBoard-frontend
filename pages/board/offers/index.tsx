import type { ReactElement } from 'react';
import { Fragment } from 'react';
import Layout from '../../../components/layouts/Layout';
import OfferOverview from '../../../components/OfferOverview';
import { useInfiniteOffers } from '../../../hooks/requests/offers';

function AllOffersPage() {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteOffers();

  return (
    <div>
      <h1>募集一覧</h1>
      {error && <p role="alert">エラーが発生しました。詳細: error.message</p>}
      {data && (
        <div className="offers-container">
          {data.pages.map((pageData, i) => (
            <Fragment key={i}>
              {pageData.offers.map((offer) => (
                <OfferOverview key={offer.id} offer={offer} />
              ))}
            </Fragment>
          ))}
        </div>
      )}
      {hasNextPage && (
        <div>
          <button
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
          >
            もっと見る
          </button>
        </div>
      )}
      {isFetching && <p>ロード中...</p>}
      <style jsx>
        {`
          .offers-container {
            display: flex;
            flex-wrap: wrap;
            align-items: start;
            margin: 10px;
          }
        `}
      </style>
    </div>
  );
}

AllOffersPage.getLayout = (page: ReactElement) => {
  return <Layout title="募集を探す">{page}</Layout>;
};

export default AllOffersPage;
