import { useRouter } from 'next/router';
import type { ReactElement } from 'react';
import { resetIdCounter, Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import css from 'styled-jsx/css';
import Layout from '../../components/layouts/Layout';
import OfferOverview from '../../components/OfferOverview';
import UserOfferProvider from '../../components/UserOfferProvider';
import { user } from '../../mocks/handlers/auth';

function UserProfilePage() {
  // https://github.com/reactjs/react-tabs#resetidcounter-void
  if (typeof window === 'undefined') {
    resetIdCounter();
  }

  const { className: scopedTabListClass, styles: tabListStyles } = css.resolve`
    .tab-list {
      border-bottom: 1px solid gray;
      width: fit-content;
      margin: 8px;
      padding-right: 28px;
    }
  `;

  const { className: scopedTabClass, styles: tabStyles } = css.resolve`
    .tab {
      display: inline-block;
      margin-right: 8px;
      padding: 4px;
      border: solid gray;
      border-width: 1px 1px 0 1px;
      border-radius: 4px 4px 0 0;
      cursor: pointer;
    }
    .tab:hover {
      background-color: lightgray;
    }
    .tab.selected-tab {
      background-color: gray;
    }
  `;

  const {
    className: scopedTabPanelClass,
    styles: tabPanelStyles,
  } = css.resolve`
    .tab-panel {
      display: flex;
      flex-wrap: wrap;
      align-items: start;
      margin: 0 10px;
    }
  `;

  const tabClass = `tab ${scopedTabClass}`;
  const tabPanelClass = `tab-panel ${scopedTabPanelClass}`;

  const router = useRouter();
  const userId = router.query.userId as string;

  return (
    <div>
      <h1>ユーザー詳細</h1>
      <div className="user-info">
        <p>学籍番号: {user.student_number}</p>
        <p>名前: {user.user_name}</p>
        <p className="self-introduction">{user.self_introduction}</p>
        <p>
          Webサイト: <a href={user.link}>{user.link}</a>
        </p>
      </div>
      <h2>{user.user_name}さんの投稿</h2>
      <Tabs selectedTabClassName="selected-tab">
        <TabList className={`tab-list ${scopedTabListClass}`}>
          <Tab className={tabClass}>募集</Tab>
          <Tab className={tabClass}>宣伝</Tab>
          <Tab className={tabClass}>作品</Tab>
        </TabList>
        <TabPanel className={tabPanelClass}>
          <UserOfferProvider studentNumber={userId}>
            {({ data }) =>
              data
                ? data.offers.map((offer) => (
                    <OfferOverview key={offer.id} offer={offer}></OfferOverview>
                  ))
                : 'ロード中'
            }
          </UserOfferProvider>
        </TabPanel>
        <TabPanel className={tabPanelClass}>
          <h3>宣伝</h3>
        </TabPanel>
        <TabPanel className={tabPanelClass}>
          <h3>作品</h3>
        </TabPanel>
      </Tabs>
      <style jsx>
        {`
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
      {tabListStyles}
      {tabStyles}
      {tabPanelStyles}
    </div>
  );
}

UserProfilePage.getLayout = (page: ReactElement) => {
  return <Layout title="ユーザーのプロフィール">{page}</Layout>;
};

export default UserProfilePage;
