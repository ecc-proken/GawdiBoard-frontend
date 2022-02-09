import Link from 'next/link';
import { useRouter } from 'next/router';
import type { ReactElement } from 'react';
import { Fragment, useState, useEffect } from 'react';
import css from 'styled-jsx/css';
import Header from '../../../components/layouts/Header';
import Layout from '../../../components/layouts/Layout';
import OfferOverview from '../../../components/OfferOverview';
import PopupMenu from '../../../components/PopupMenu';
import TagProvider from '../../../components/TagProvider';
import { useOfferSearchForm } from '../../../hooks/forms/useOfferSearchForm';
import { useInfiniteOffers } from '../../../hooks/requests/offers';

function AllOffersPage() {
  const router = useRouter();

  const [showFilter, setShowFilter] = useState(false);

  // https://nextjs.org/docs/api-reference/next/router#router-object
  // router.isReadyはuseEffectの中以外で使う想定で作られてないので
  // useEffect内でisReadyを見ながら、もうフェッチしていいかを判断する。
  const [shouldWaitFetch, setShouldWaitFetch] = useState(true);
  useEffect(() => {
    if (router.isReady) {
      setShouldWaitFetch(false);
    }
  }, [router.isReady, setShouldWaitFetch]);

  const offer_tag_ids = prepareTagIdsFromQuery(router.query.offer_tag_ids);

  const { register, handleSubmit } = useOfferSearchForm();
  const onSubmit = handleSubmit(({ offer_tag_ids }) => {
    setShowFilter(false);
    router.push({
      pathname: '/board/offers',
      query: { offer_tag_ids },
    });
  });

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
  } = useInfiniteOffers({ offer_tag_ids }, !shouldWaitFetch);

  const toggleFilter = () => {
    setShowFilter((b) => !b);
  };

  return (
    <div>
      <h1>募集一覧</h1>
      <div>
        <Link href="/offer/post">投稿する</Link>
      </div>
      <button className="filter-toggle" onClick={toggleFilter}>
        フィルター
        <img className="dropdown-icon" src="/dropdown.svg" />
      </button>
      <PopupMenu
        isOpen={showFilter}
        onRequestClose={() => setShowFilter(false)}
        className={`${filterClassName} filter-popup`}
      >
        <TagProvider tag_genre_id={1}>
          {({ data, isLoading, error }) => (
            <form className="filter-popup" onSubmit={onSubmit}>
              {isLoading && <span>ロード中...</span>}
              {error && (
                <span>エラーが発生しました。詳細: {error.message}</span>
              )}
              {data &&
                data.tags.map((tag, i) => (
                  <Fragment key={tag.id}>
                    <label htmlFor={`tag${i}`} className="filter-option">
                      {tag.name}
                    </label>
                    <input
                      id={`tag${i}`}
                      type="checkbox"
                      value={tag.id}
                      defaultChecked={offer_tag_ids.includes(tag.id)}
                      {...register(`offer_tag_ids.${i}`)}
                    />
                  </Fragment>
                ))}
              <br />
              <button>この条件で検索</button>
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
          .filter-toggle {
            padding: 12px 18px;
            background-color: #ffffff;
            border-radius: 22.5px;
            border: 1px solid #9e9e9e;
            font-weight: 700;
            color: var(--black-900);
          }
          .dropdown-icon {
            margin-left: 18px;
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

function prepareTagIdsFromQuery(tagIds: string | string[] | undefined) {
  if (tagIds === undefined) {
    return [];
  }

  if (typeof tagIds === 'string') {
    return [+tagIds];
  }

  return tagIds.map((id) => +id);
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
