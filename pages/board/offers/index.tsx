import Link from 'next/link';
import type { ReactElement } from 'react';
import { Fragment, useState } from 'react';
import css from 'styled-jsx/css';
import Header from '../../../components/layouts/Header';
import Layout from '../../../components/layouts/Layout';
import OfferOverview from '../../../components/OfferOverview';
import PopupMenu from '../../../components/PopupMenu';
import TagProvider from '../../../components/TagProvider';
import { useInfiniteOffers } from '../../../hooks/requests/offers';

function AllOffersPage() {
  const [showFilter, setShowFilter] = useState(false);

  const { className: filterClassName, styles: filterStyle } = css.resolve`
    .filter-popup {
      position: absolute;
      width: 40%;
      height: 480px;
      margin-left: 4px;
      background-color: white;
      border-radius: 8px;
      border: solid grey 1px;
    }
  `;

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteOffers();

  const toggleFilter = () => {
    setShowFilter((b) => !b);
  };

  return (
    <div>
      <h1>募集一覧</h1>
      <div>
        <Link href="/offer/post">投稿する</Link>
      </div>
      <button onClick={toggleFilter}>フィルター</button>
      <PopupMenu
        isOpen={showFilter}
        onRequestClose={() => setShowFilter(false)}
        className={`${filterClassName} filter-popup`}
      >
        <TagProvider tag_genre_id={1}>
          {({ data, isLoading, error }) => (
            <form className="filter-popup">
              {isLoading && <span>ロード中...</span>}
              {error && (
                <span>エラーが発生しました。詳細: {error.message}</span>
              )}
              {data &&
                data.tags.map((tag) => (
                  <label key={tag.id} className="filter-option">
                    {tag.name}
                    <input type="checkbox" value={tag.id} />
                  </label>
                ))}
              <br />
              <button onClick={() => setShowFilter(false)}>
                この条件で検索
              </button>
            </form>
          )}
        </TagProvider>
      </PopupMenu>
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
          .filter-option {
            white-space: nowrap;
            margin: 8px;
          }
        `}
      </style>
      {filterStyle}
    </div>
  );
}

AllOffersPage.getLayout = (page: ReactElement) => {
  return (
    <>
      <Header />
      <Layout title="募集を探す">{page}</Layout>
    </>
  );
};

export default AllOffersPage;
