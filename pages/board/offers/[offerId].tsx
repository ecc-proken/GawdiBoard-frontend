import { useRouter } from 'next/router';
import { useState } from 'react';
import type { ReactElement } from 'react';
import Modal from 'react-modal';
import css from 'styled-jsx/css';
import ApplicationForm from '../../../components/applicationForm';
import Header from '../../../components/layouts/Header';
import Layout from '../../../components/layouts/Layout';
import { useOffer } from '../../../hooks/requests/offers';

const { className: modalClassName, styles: modalStyles } = css.resolve`
  .modal {
    position: absolute;
    right: 25%;
    left: 30%;
    top: 30%;
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
          <div className="top-info">
            <div className="user-info">
              <div className="user-icon"></div>
              <div>
                <div>
                  <span className="user-class">{offer.user_class || ''}</span>
                  <span className="student-number">{offer.student_number}</span>
                </div>
                <span className="user-name">{offer.user_name}</span>
              </div>
            </div>
            <p>{offer.end_date}に掲載終了</p>
          </div>
          {offer.picture ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={offer.picture}
              alt="投稿主がアップロードした画像"
              className="offer-image"
            />
          ) : (
            <div className="offer-image">{offer.tags[0].name}</div>
          )}
          <h1>{offer.title}</h1>
          <div className="tags">
            {offer.tags.map((tag) => (
              <span key={tag.id} className="tag">
                #{tag.name}
              </span>
            ))}
          </div>
          <div className="info-grid">
            <div className="offer-info">
              {offer.note && <p className="note">{offer.note}</p>}
              <div className="extra-info">
                <div className="circle" />
                投稿日 <br />
                {offer.post_date}
              </div>
              <div className="extra-info">
                <div className="circle" />
                参考リンク
                <br />
                {offer.link ? <a href={offer.link}>{offer.link}</a> : 'なし'}
              </div>
              <div className="extra-info">
                <div className="circle" />
                募集対象者 <br />
                {offer.target || '明記なし'}
              </div>
              <div className="extra-info">
                <div className="circle" />
                役職と人数 <br />
                {offer.job || '明記なし'}
              </div>
            </div>
            <div className="application-info">
              <button onClick={() => setShowModal(true)}>興味がある</button>
            </div>
          </div>

          <Modal
            className={`modal ${modalClassName}`}
            isOpen={showModal}
            onRequestClose={() => setShowModal(false)}
          >
            <div className="modal-header">
              <button onClick={() => setShowModal(false)}>X</button>
            </div>
            <ApplicationForm offerId={offer.id} />
          </Modal>
        </div>
      )}
      <style jsx>
        {`
          .offer {
            width: 70%;
            margin: auto;
          }
          .top-info {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
          }
          .offer-image {
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: var(--accent-color);
            color: #ffffff;
            font-weight: 700;
            aspect-ratio: 16/9;
          }
          .tags {
            display: flex;
            flex-wrap: wrap;
            margin-bottom: 40px;
          }
          .tag {
            margin: 4px;
            color: var(--accent-color);
            font-size: 0.9rem;
            padding: 4px 8px;
            border: var(--accent-color) solid 1px;
            border-radius: 16px;
            white-space: nowrap;
          }
          .info-grid {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
          .offer-info {
            grid-column: 1 / 3;
            padding-right: 12px;
          }
          .application-info {
            grid-column: 3 / 3;
            position: relative;
          }
          .application-info button {
            background-color: var(--accent-color);
            color: #ffffff;
            border: 0;
            margin-left: 10%;
            width: 90%;
            padding: 8px;
            border-radius: 32px;
          }
          .note {
            margin-bottom: 24px;
            white-space: pre-wrap;
          }
          .extra-info {
            margin: 16px 0;
          }
          .circle {
            display: inline-block;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background-color: var(--accent-color);
            margin-right: 4px;
          }
          .modal-header {
            display: flex;
            flex-direction: row-reverse;
          }
          .user-info {
            display: flex;
            align-items: flex-end;
          }
          .user-icon {
            width: 45px;
            height: 45px;
            margin-right: 6px;
            border-radius: 59%;
            background-color: #707070;
          }
        `}
      </style>
      {modalStyles}
    </div>
  );
}

OfferDetailPage.getLayout = (page: ReactElement) => {
  return (
    <>
      <Header />
      <Layout title="募集の詳細">{page}</Layout>
    </>
  );
};

export default OfferDetailPage;
