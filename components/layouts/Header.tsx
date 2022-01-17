/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import NavLink from '../NavLink';

export default function Header() {
  return (
    <>
      <header>
        <div>
          <Link href="/board/offers">
            <a aria-label="ガウディーボードトップへ">
              <img
                alt="ガウディーボードロゴ"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2048px-Google_%22G%22_Logo.svg.png"
                className="logo"
              />
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
        <div>
          <Link href="/user/2180372">
            <a aria-label="プロフィール画面へ">
              <img
                alt="ユーザーアイコン"
                className="user-icon"
                src="https://placeimg.com/200/200/animals"
              ></img>
            </a>
          </Link>
        </div>
      </header>
      <style jsx>{`
        header {
          white-space: nowrap;
          display: flex;
          justify-content: space-between;
          padding: 8px;
        }
        .logo {
          width: 60px;
        }
        .user-icon {
          width: 50px;
          clip-path: circle(50%);
          margin: 20px 40px;
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
          color: black;
          font-size: 1.2rem;
        }
        nav a:hover {
          text-decoration: underline;
        }
        nav a.active {
          color: tomato;
        }
      `}</style>
    </>
  );
}
