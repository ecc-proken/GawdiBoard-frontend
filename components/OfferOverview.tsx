import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useMemo } from 'react';
import type { Offer } from '../hooks/requests/offers';

type Props = {
  offer: Offer;
  editable?: boolean;
};

export default function OfferOverview({ offer, editable = false }: Props) {
  const [showMenu, setShowMenu] = useState(false);
  const daysBeforeExpiration = getDaysBeforeExpiration(
    new Date(offer.end_date)
  );

  const router = useRouter();

  const firstTagName = offer.tags[0].name;
  const randomIconSize = useMemo(
    () => Math.floor(Math.random() * (300 + 1 - 200)) + 200,
    []
  );

  return (
    <div className="offer-overview">
      {editable && (
        <div>
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
                <button onClick={() => router.push(`/offer/edit/${offer.id}`)}>
                  編集
                </button>
                <button onClick={() => alert(`応募${offer.id}を削除`)}>
                  削除
                </button>
              </div>
            </>
          ) : null}
        </div>
      )}
      <div className="offer-image">{firstTagName}</div>
      <h2>
        <Link href={`/board/offers/${offer.id}`}>
          <a className="title">{offer.title}</a>
        </Link>
      </h2>
      <p className="note">{offer.note || 'なし'}</p>
      <div className="info">
        <div className="user-info">
          <img
            alt="募集主のアイコン"
            src={`https://placeimg.com/${randomIconSize}/${randomIconSize}/nature`}
            className="user-icon"
          ></img>
          <div>
            <div>
              <span className="user-class">{offer.user_class || ''}</span>
              <span className="student-number">{offer.student_number}</span>
            </div>
            <span className="user-name">{offer.user_name}</span>
          </div>
        </div>
        <div className="days-left">
          {daysBeforeExpiration > 0
            ? `残り${getDaysBeforeExpiration(new Date(offer.end_date))}日`
            : '募集終了'}
        </div>
      </div>
      {/* <p>対象者: {offer.target || '詳細を見てください'}</p> */}
      <div className="tags">
        {offer.tags.map((tag) => (
          <span className="tag" key={tag.id}>
            {tag.name}
          </span>
        ))}
      </div>
      <style jsx>{`
        .offer-overview {
          width: 30%;
          min-width: 250px;
          margin: 4px;
          padding: 8px;
          color: var(--black-900);
        }
        .offer-image {
          background-color: var(--accent-color);
          border-radius: 8px;
          width: 100%;
          height: 160px;
          box-shadow: 4px 4px 4px #bebebe;
          font-size: 1.4rem;
          font-weight: 900;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #ffffff;
          margin-bottom: 12px;
        }
        .title {
          color: var(--black-900);
          font-size: 1.2rem;
          text-decoration: none;
          margin-bottom: 6px;
        }
        .note {
          margin-bottom: 6px;
        }
        .info {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 6px;
        }
        .user-info {
          display: flex;
          align-items: flex-end;
        }
        .user-icon {
          width: 45px;
          height: 45px;
          margin-right: 6px;
          clip-path: circle(50%);
        }
        .user-class {
          margin-right: 8px;
        }
        .user-class,
        .student-number {
          font-size: 0.8rem;
        }
        .tags {
          display: flex;
          flex-wrap: wrap;
          margin-bottom: 4px;
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
