import { createContext, useContext, useState } from 'react';
import type { Dispatch, MouseEvent, ReactNode, SetStateAction } from 'react';
import { useApplyOffer } from '../../hooks/requests/offers';
import {
  OrderedPages,
  Page,
  Indicator,
  useOrderedPages,
} from '../OrderedPages';
import Completed from './Completed';
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
  const { mutate } = useApplyOffer();
  const [interest, setInterest] = useState<number | null>(null);
  const [userClass, setUserClass] = useState('');
  const [message, setMessage] = useState('');

  const onSubmit = (e: MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(
      {
        offer_id: offerId,
        interest: interest || 1,
        user_class: userClass,
        message,
      },
      {
        onSuccess() {
          pageForward();
        },
      }
    );
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
    </ApplyFormContext.Provider>
  );
}

type ApplyFormProps = {
  offerId: number;
};

function ApplyForm({ offerId }: ApplyFormProps) {
  return (
    <OrderedPages>
      <PagedApplyForm offerId={offerId}>
        <Page>
          <div className="indicator">
            <Indicator />
          </div>
          <InterestLevel />
        </Page>
        <Page>
          <div className="indicator">
            <Indicator />
          </div>
          <UserClass />
        </Page>
        <Page>
          <div className="indicator">
            <Indicator />
          </div>
          <Message />
        </Page>
        <Page>
          <Completed />
        </Page>
      </PagedApplyForm>
    </OrderedPages>
  );
}

export default ApplyForm;
