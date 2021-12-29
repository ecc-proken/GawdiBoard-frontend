import { useRouter } from 'next/router';
import { useState } from 'react';
import type { ReactElement } from 'react';
import Modal from 'react-modal';
import css from 'styled-jsx/css';
import Layout from '../../../components/layouts/Layout';
import { useOffer } from '../../../hooks/requests/offers';

const { className: modalClassName, styles: modalStyles } = css.resolve`
  .modal {
    position: absolute;
    top: 30%;
    right: 30%;
    bottom: 30%;
    left: 30%;
    /* min-width: 450px; */
    padding: 20px;
    border: 1px solid gray;
    border-radius: 12px;
    background-color: white;
  }

  @media (max-width: 768px) {
    .modal {
      top: 25%;
      right: 20px;
      bottom: 25%;
      left: 20px;
    }
  }
`;

function OfferDetailPage() {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const { data, error, isLoading } = useOffer(
    // 初期ロード時にrouter.queryが空オブジェクトになる
    // 参考: https://nextjs.org/docs/routing/dynamic-routes#caveats
    // offer_idがundefinedの内はリクエストを送らないのでそのまま通す。
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    { offer_id: +router.query.offerId! },
    // offer_idが取れるまでリクエストを遅らせる
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
          <button onClick={() => setShowModal(true)}>興味がある</button>
          <Modal
            className={`modal ${modalClassName}`}
            isOpen={showModal}
            onRequestClose={() => setShowModal(false)}
          >
            <div className="modal-header">
              <button onClick={() => setShowModal(false)}>X</button>
            </div>
            <button>ぜひ参加したい</button>
            <br />
            <button>内容によっては参加したい</button>
            <br />
            <button>とりあえず話してみたい</button>
            <br />
          </Modal>
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
          .modal-header {
            display: flex;
            flex-direction: row-reverse;
          }
          button {
            margin-bottom: 8px;
          }
          p {
            margin-bottom: 8px;
          }
        `}
      </style>
      {modalStyles}
    </div>
  );
}

OfferDetailPage.getLayout = (page: ReactElement) => {
  return <Layout title="募集の詳細">{page}</Layout>;
};

export default OfferDetailPage;
