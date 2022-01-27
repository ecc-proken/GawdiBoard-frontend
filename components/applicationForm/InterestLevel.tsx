import { ForwardButton, useOrderedPages } from '../OrderedPages';

const INTEREST_LEVELS = {
  HIGH: 3,
  MIDDLE: 2,
  LOW: 1,
};

function InterestLevel() {
  const { pageForward } = useOrderedPages();

  const handleInterestSelected = (fn: () => void) => {
    return () => {
      fn();
      pageForward();
    };
  };

  const onHighSelected = handleInterestSelected(() => {
    setInterest(INTEREST_LEVELS.HIGH);
  });

  const onMiddleSelected = handleInterestSelected(() => {
    setInterest(INTEREST_LEVELS.MIDDLE);
  });

  const onLowSelected = handleInterestSelected(() => {
    setInterest(INTEREST_LEVELS.LOW);
  });

  // フェイク
  const setInterest = (interest: number) => {
    return;
  };

  return (
    <>
      <div className="interest-selector">
        <p className="instruction">この募集にどのくらい興味がありますか？</p>
        <button onClick={onHighSelected}>是非参加したい</button>
        <br />
        <button onClick={onMiddleSelected}>内容によっては参加したい</button>
        <br />
        <button onClick={onLowSelected}>とりあえず話してみたい</button>
      </div>
      {/* <div className="page-controller">
        <ForwardButton>進む →</ForwardButton>
      </div> */}
      <style jsx>{`
        .instruction {
          margin-bottom: 16px;
        }
        .interest-selector {
          text-align: center;
          margin-bottom: 16px;
        }
        .interest-selector button {
          padding: 16px 32px;
          border-radius: 28px;
          border: 0;
          color: #ffffff;
          background-color: #25a5ec;
          font-weight: 800;
          margin-bottom: 12px;
        }
        button:hover {
          background-color: #36b3f7;
        }
        .page-controller {
          text-align: center;
        }
      `}</style>
    </>
  );
}

export default InterestLevel;
