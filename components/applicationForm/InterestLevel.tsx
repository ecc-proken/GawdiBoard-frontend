import { ForwardButton } from '../OrderedPages';
import { useApplyFormContext } from '.';

const INTEREST_LEVELS = {
  HIGH: 1,
  MIDDLE: 2,
  LOW: 3,
};

function InterestLevel() {
  const { interest, setInterest } = useApplyFormContext();
  const handleInterestSelected = (fn: () => void) => {
    return () => {
      fn();
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

  return (
    <>
      <div className="interest-selector">
        <p className="instruction">この募集にどのくらい興味がありますか？</p>
        <button
          type="button"
          className={`interest-option ${interest === 1 ? 'selected' : ''}`}
          onClick={onHighSelected}
        >
          是非参加したい
        </button>
        <br />
        <button
          type="button"
          className={`interest-option ${interest === 2 ? 'selected' : ''}`}
          onClick={onMiddleSelected}
        >
          内容によっては参加したい
        </button>
        <br />
        <button
          type="button"
          className={`interest-option ${interest === 3 ? 'selected' : ''}`}
          onClick={onLowSelected}
        >
          とりあえず話してみたい
        </button>
      </div>
      <div className="page-controller">
        <ForwardButton disabled={interest === null}>次へ</ForwardButton>
      </div>
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
          font-weight: 800;
          margin-bottom: 12px;
          background-color: #ffffff;
          border: 1px solid #25a5ec;
          color: #25a5ec;
        }
        .interest-selector button.selected {
          padding: 16px 32px;
          border-radius: 28px;
          border: 0;
          color: #ffffff;
          background-color: #25a5ec;
        }
        .interest-selector button:hover {
          cursor: pointer;
        }
        .page-controller {
          text-align: center;
        }
      `}</style>
    </>
  );
}

export default InterestLevel;
