import type { ChangeEvent } from 'react';
import { ForwardButton, BackButton } from '../OrderedPages';
import { useApplyFormContext } from '.';

function UserClass() {
  const { userClass, setUserClass } = useApplyFormContext();
  const onChangeUserClass = (e: ChangeEvent<HTMLInputElement>) => {
    setUserClass(e.target.value);
  };

  return (
    <>
      <div className="user_class_wrapper">
        <p className="instruction">自分のクラスを入力してください</p>
        <input
          id="user_class"
          type="text"
          value={userClass}
          name="user_class"
          onChange={onChangeUserClass}
          aria-label="自分のクラス"
        />
        <p className="note">
          募集主はあなたの所属するクラスを知ることができます
        </p>
      </div>
      <div className="page-controller">
        <BackButton>戻る</BackButton>
        <ForwardButton disabled={userClass.length === 0}>次へ</ForwardButton>
      </div>
      <style jsx>{`
        .user_class_wrapper {
          text-align: center;
          margin-bottom: 24px;
        }
        .instruction {
          font-weight: 700;
          font-size: 1.2rem;
          margin-bottom: 48px;
        }
        input {
          font-size: 1.1rem;
          width: 60%;
          padding: 12px 16px;
          margin-top: 4px;
          margin-bottom: 18px;
          border-radius: 4px;
          border: 1px solid #cdcdcd;
        }
        .note {
          font-size: 0.8rem;
        }
        .page-controller {
          display: flex;
          justify-content: space-evenly;
        }
      `}</style>
    </>
  );
}

export default UserClass;
