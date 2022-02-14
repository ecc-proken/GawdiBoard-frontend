import { useState } from 'react';
import { useApplyOffer } from '../../hooks/requests/offers';
import { OrderedPages, Page, Indicator } from '../OrderedPages';
import Completed from './Completed';
import InterestLevel from './InterestLevel';
import Message from './Message';
import UserClass from './UserClass';

type Props = {
  offerId: number;
};

function ApplicationForm({ offerId }: Props) {
  const { mutate } = useApplyOffer();
  const [interest, setInterest] = useState<number | null>(null);
  const [userClass, setUserClass] = useState('');
  const [message, setMessage] = useState('');

  const onSubmit = () => {
    mutate({
      offer_id: offerId,
      interest: interest || 1,
      user_class: userClass,
      message,
    });
  };
  return (
    <div role="form" aria-label="募集主に連絡をとる">
      <OrderedPages>
        <Page>
          <div className="indicator">
            <Indicator />
          </div>
          <InterestLevel interest={interest} setInterest={setInterest} />
        </Page>
        <Page>
          <div className="indicator">
            <Indicator />
          </div>
          <UserClass userClass={userClass} setUserClass={setUserClass} />
        </Page>
        <Page>
          <div className="indicator">
            <Indicator />
          </div>
          <Message
            message={message}
            setMessage={setMessage}
            onSubmit={onSubmit}
          />
        </Page>
        <Page>
          <Completed />
        </Page>
      </OrderedPages>
      <style jsx>{`
        .indicator {
          text-align: center;
          margin-bottom: 24px;
        }
        .page-controller {
          text-align: center;
          margin-top: 24px;
        }
      `}</style>
    </div>
  );
}

export default ApplicationForm;
