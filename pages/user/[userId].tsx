import { useRouter } from 'next/router';
import type { ReactElement } from 'react';
import Layout from '../../components/layouts/Layout';
import OfferOverview from '../../components/OfferOverview';
import { useUserOffers } from '../../hooks/requests/offers';
import { user } from '../../mocks/handlers/auth';

function UserProfilePage() {
  const router = useRouter();
  const userId = router.query.userId as string;

  const { data, isLoading } = useUserOffers(
    { student_number: userId },
    router.isReady
  );

  return (
    <div>
      <h1>ユーザー詳細</h1>
      {isLoading && <p>データをロード中</p>}
      <div className="user-info">
        <p>学籍番号: {user.student_number}</p>
        <p>名前: {user.user_name}</p>
        <p className="self-introduction">{user.self_introduction}</p>
        <p>
          Webサイト: <a href={user.link}>{user.link}</a>
        </p>
      </div>
      <ul className="tab">
        <li role="button" className="selected">
          投稿した募集
        </li>
        <li role="button">投稿した宣伝</li>
        <li role="button">投稿した作品</li>
      </ul>
      {data && (
        <div>
          {data.offers.map((offer) => (
            <OfferOverview key={offer.id} offer={offer}></OfferOverview>
          ))}
        </div>
      )}
      <style jsx>
        {`
          .tab {
            border-bottom: 1px solid gray;
            width: fit-content;
            margin: 8px;
            padding-right: 28px;
          }
          .tab > li {
            display: inline-block;
            margin-right: 8px;
            padding: 4px;
            border: solid gray;
            border-width: 1px 1px 0 1px;
            border-radius: 4px 4px 0 0;
            cursor: pointer;
          }
          .tab > li:hover {
            background-color: lightgray;
          }
          .tab > li.selected {
            background-color: lightgray;
          }
          .user-info {
            background-color: white;
            margin: 24px auto 24px auto;
            width: 60%;
            padding: 12px;
            border: 1px solid gray;
            border-radius: 12px;
          }
          .user-info > .self-introduction {
            line-height: 1.8;
            text-decoration: underline;
            margin: 8px 12px;
          }
        `}
      </style>
    </div>
  );
}

UserProfilePage.getLayout = (page: ReactElement) => {
  return <Layout title="ユーザーのプロフィール">{page}</Layout>;
};

export default UserProfilePage;
