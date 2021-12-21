import { useRouter } from 'next/router';
import type { ReactElement } from 'react';
import Layout from '../../../components/layouts/Layout';
import { useOffer } from '../../../hooks/requests/offers';

function OfferDetailPage() {
  const router = useRouter();

  const { data, error, isLoading } = useOffer(
    // 実際にはstring[]は入らないのでstringに変換する
    '' + router.query.offerId,
    // 初期ロードでrouter.queryが空オブジェクトになるのでリクエストをスキップ
    router.isReady
  );

  const offer = data?.offer;
  return (
    <div>
      {isLoading && <p>ロード中</p>}
      {error && <p role="alert">エラーが発生しました。詳細: error.message</p>}
      {offer && (
        <div className="offer">
          <h1>{offer.title}</h1>
          <div className="tags">
            {offer.tags.map((tag) => (
              <span key={tag.id} className="tag">
                #{tag.name}
              </span>
            ))}
          </div>
          <div className="offerer">
            募集主の情報:
            <br />
            {offer.user_name} {offer.user_class} {offer.student_number}
          </div>
          <p>募集対象者: {offer.target || '明記なし'}</p>
          <p>役職と人数: {offer.job || '明記なし'}</p>
          <p>備考: {offer.note || ''}</p>
          {offer.picture && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={offer.picture}
              alt="投稿主がアップロードした画像"
              width="300"
              height="200"
            />
          )}
          <p>
            参考リンク:{' '}
            {offer.link ? <a href={offer.link}>{offer.link}</a> : 'なし'}
          </p>
          <p>投稿日: {offer.post_date}</p>
          <p>掲載終了日: {offer.end_date}</p>
          <button
            onClick={() => {
              alert('興味がある');
            }}
          >
            興味がある
          </button>
        </div>
      )}
      <style jsx>
        {`
          .tag {
            background-color: lightgray;
            margin: 0 4px;
          }
          .offerer {
            margin-bottom: 8px;
          }
          p {
            margin-bottom: 8px;
          }
        `}
      </style>
    </div>
  );
}

OfferDetailPage.getLayout = (page: ReactElement) => {
  return <Layout title="募集の詳細">{page}</Layout>;
};

export default OfferDetailPage;
