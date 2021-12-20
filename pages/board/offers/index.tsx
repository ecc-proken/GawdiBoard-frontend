import type { ReactElement } from 'react';
import { Fragment } from 'react';
import Layout from '../../../components/layouts/Layout';
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
        <>
          {data.pages.map((pageData, i) => (
            <Fragment key={i}>
              {pageData.offers.map((offer: any) => (
                <div key={offer.id} className="offer">
                  <h2>{offer.title}</h2>
                  <p>掲載終了日: {offer.end_date}</p>
                  <p>募集主: {offer.user_name}</p>
                </div>
              ))}
            </Fragment>
          ))}
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
        </>
      )}
      {isFetching && <p>ロード中...</p>}
      <style jsx>
        {`
          .offer {
            display: inline-block;
            border: gray 2px solid;
            border-radius: 10px;
            width: 25%;
            margin: 20px 10px;
            padding: 10px;
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
