import { OrderedPages, Page, Indicator } from '../OrderedPages';
import Completed from './Completed';
import InterestLevel from './InterestLevel';
import Message from './Message';
import UserClass from './UserClass';

function ApplicationForm() {
  return (
    <div role="form" aria-label="募集主に連絡をとる">
      <OrderedPages>
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
