/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { useLoginUser } from '../../hooks/requests/auth';
import NavLink from '../NavLink';

export default function Header() {
  const { data } = useLoginUser();

  return (
    <>
      <header>
        <div>
          <Link href="/board/offers">
            <a className="home" aria-label="ガウディーボードトップへ">
              <span className="g">G</span>awdi
            </a>
          </Link>
          <nav>
            <ul>
              <li>
                <NavLink href="/board/offers">
                  <a>募集を見る</a>
                </NavLink>
              </li>
              <li>
                <NavLink href="/board/promotions">
                  <a>宣伝を見る</a>
                </NavLink>
              </li>
              <li>
                <NavLink href="/board/works">
                  <a>作品を見る</a>
                </NavLink>
              </li>
              <li>
                <NavLink href="/about">
                  <a>当サイトについて</a>
                </NavLink>
              </li>
              <li>
                <NavLink href="/how-to-use">
                  <a>当サイトの使い方</a>
                </NavLink>
              </li>
              <li>
                <NavLink href="/contact">
                  <a>お問い合わせ</a>
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
        {data ? (
          <div>
            <Link href={`/user/${data.user.student_number}`}>
              <a aria-label="プロフィール画面へ">
                <div className="user-icon"></div>
              </a>
            </Link>
          </div>
        ) : (
          <div>
            <Link href="/login">ログイン</Link>
          </div>
        )}
      </header>
      <style jsx>{`
        header {
          white-space: nowrap;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px;
          border-bottom: 1px solid #cdcdcd;
          position: sticky;
          background-color: #ffffff;
          top: 0;
        }
        .home {
          font-size: 1.3rem;
          color: var(--black-900);
          text-decoration: none;
        }
        .g {
          font-size: 1.5rem;
          color: tomato;
        }
        .user-icon {
          width: 50px;
          height: 50px;
          clip-path: circle(50%);
          margin-right: 40px;
          background-color: gray;
        }
        nav {
          display: inline-block;
        }
        ul {
          list-style: none;
          display: flex;
          flex-wrap: wrap;
        }
        nav li {
          margin-left: 12px;
          white-space: nowrap;
        }
        nav a {
          text-decoration: none;
          color: var(--black-900);
          font-size: 1.2rem;
          font-weight: 700;
        }
        nav a:hover {
          text-decoration: underline;
        }
        nav a.active {
          color: var(--accent-color);
        }
      `}</style>
    </>
  );
}
