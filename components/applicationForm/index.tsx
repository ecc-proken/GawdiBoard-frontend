import { createContext, useContext, useState } from 'react';
import type { Dispatch, MouseEvent, ReactNode, SetStateAction } from 'react';
import { useApplyOffer } from '../../hooks/requests/offers';
import {
  ForwardButton,
  OrderedPages,
  Page,
  useOrderedPages,
} from '../OrderedPages';
import Completed from './Completed';
import Indicator from './Indicator';
import InterestLevel from './InterestLevel';
import Message from './Message';
import UserClass from './UserClass';

type ApplyFormContextType = {
  interest: number | null;
  setInterest: Dispatch<SetStateAction<number | null>>;
  userClass: string;
  setUserClass: Dispatch<SetStateAction<string>>;
  message: string;
  setMessage: Dispatch<SetStateAction<string>>;
};
const ApplyFormContext = createContext<ApplyFormContextType>(
  {} as ApplyFormContextType
);
ApplyFormContext.displayName = 'ApplyFormContext';

export function useApplyFormContext() {
  return useContext(ApplyFormContext);
}

type PagedApplyFormProps = {
  offerId: number;
  children: ReactNode;
};

function PagedApplyForm({ offerId, children }: PagedApplyFormProps) {
  const { pageForward } = useOrderedPages();
  const { mutate, isLoading, isError } = useApplyOffer();
  const [interest, setInterest] = useState<number | null>(null);
  const [userClass, setUserClass] = useState('');
  const [message, setMessage] = useState('');

  const onSubmit = (e: MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    // mutate(
    //   {
    //     offer_id: offerId,
    //     interest: interest || 1,
    //     user_class: userClass,
    //     message,
    //   },
    //   {
    //     onSuccess() {
    //       pageForward();
    //     },
    //   }
    // );
    pageForward();
  };

  return (
    <ApplyFormContext.Provider
      value={{
        interest,
        setInterest,
        userClass,
        setUserClass,
        message,
        setMessage,
      }}
    >
      <form onSubmit={onSubmit}>{children}</form>
      {isLoading && <p className="message load">データを送信中...</p>}
      {isError && (
        <p className="message error">
          データの送信に失敗しました。しばらくしてから再度送信してください。
        </p>
      )}
      <style jsx>{`
        .message {
          margin-top: 12px;
          text-align: center;
        }
        .message.error {
          margin-top: 12px;
          text-align: center;
          color: #ff0000;
        }
      `}</style>
    </ApplyFormContext.Provider>
  );
}

type ApplyFormProps = {
  offerId: number;
};

function ApplyForm({ offerId }: ApplyFormProps) {
  return (
    <OrderedPages>
      <div className="indicator">
        <Indicator />
      </div>
      <PagedApplyForm offerId={offerId}>
        <Page>
          <InterestLevel />
        </Page>
        <Page>
          <UserClass />
        </Page>
        <Page>
          <Message />
        </Page>
        <Page>
          <Completed />
        </Page>
      </PagedApplyForm>
      <style jsx>{`
        .indicator {
          text-align: center;
          margin-bottom: 12px;
        }
      `}</style>
    </OrderedPages>
  );
}

export default ApplyForm;
