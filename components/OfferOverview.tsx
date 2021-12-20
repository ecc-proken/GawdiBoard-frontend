import { useState } from 'react';
import type { Offer } from '../hooks/requests/offers';

type Props = {
  offer: Offer;
};

export default function OfferOverview({ offer }: Props) {
  const [showMenu, setShowMenu] = useState(false);
  const daysBeforeExpiration = getDaysBeforeExpiration(
    new Date(offer.end_date)
  );

  return (
    <div className="offer-overview">
      <button
        aria-label="メニューを開く"
        onClick={() => setShowMenu((b) => !b)}
      >
        。。。
      </button>
      {showMenu ? (
        <>
          <div className="overlay" onClick={() => setShowMenu(false)} />
          <div className="menu-popup">
            <button onClick={() => alert(`応募${offer.id}を編集`)}>編集</button>
            <button onClick={() => alert(`応募${offer.id}を削除`)}>削除</button>
          </div>
        </>
      ) : null}
      <h2>{offer.title}</h2>
      <p>対象者: {offer.target || '詳細を見てください'}</p>
      <div className="tags">
        {offer.tags.map((tag) => (
          <span className="tag" key={tag.id}>
            {tag.name}
          </span>
        ))}
      </div>
      <p>備考: {offer.note || 'なし'}</p>
      {daysBeforeExpiration > 0 ? (
        <p>
          掲載終了まで残り{getDaysBeforeExpiration(new Date(offer.end_date))}日
        </p>
      ) : (
        <p>
          この募集は掲載が終了しています。(表示されているのがバグですので報告してください。)
        </p>
      )}
      <p>
        募集主: {offer.student_number} {offer.user_class || ''}{' '}
        {offer.user_name}
      </p>
      <style jsx>{`
        p {
          margin-bottom: 8px;
        }
        .offer-overview {
          width: 30%;
          min-width: 250px;
          margin: 4px;
          border: 2px solid black;
          border-radius: 10px;
          padding: 8px;
        }
        .tags {
          display: flex;
          margin-bottom: 4px;
        }
        .tag {
          margin: 4px;
          background-color: lightgray;
        }
        .menu-popup {
          position: absolute;
          background-color: white;
          padding: 8px;
          border: solid 1px gray;
          z-index: 10;
        }
        .overlay {
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
        }
      `}</style>
    </div>
  );
}

function getDaysBeforeExpiration(date: Date) {
  const now = Date.now();
  const diffInMs = date.getTime() - now;

  // 今日の24時になった瞬間（日付が変わった瞬間)消えるなら「残り0日」
  return Math.floor(diffInMs / (1000 * 60 * 60 * 24));
}
