import type { ReactElement } from 'react';
import { Fragment } from 'react';
import { useInfiniteQuery } from 'react-query';
import Layout from '../../../components/layouts/Layout';
import { jsonClient } from '../../../utils/httpClient';

function AllOffersPage() {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery(
    'offers',
    ({ pageParam = 1 }) =>
      jsonClient('/offer/list', { params: { page: pageParam } }),
    {
      getNextPageParam: (lastPage) => {
        const nextPage = lastPage.meta.current_page + 1;
        return lastPage.meta.last_page >= nextPage ? nextPage : false;
      },
    }
  );

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
