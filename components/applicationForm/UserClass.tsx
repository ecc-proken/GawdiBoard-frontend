import type { ChangeEvent } from 'react';
import { ForwardButton, BackButton } from '../OrderedPages';

function UserClass() {
  const onChangeUserClass = (e: ChangeEvent<HTMLInputElement>) => {
    setUserClass(e.target.value);
  };

  // フェイク
  const setUserClass = (userClass: string) => {
    return;
  };

  return (
    <>
      <div className="user_class_wrapper">
        <label htmlFor="user_class">自分のクラス</label>
        <br />
        <input
          id="user_class"
          type="text"
          name="user_class"
          onChange={onChangeUserClass}
        />
        <p className="note">
          募集主はあなたの所属するクラスを知ることができます
        </p>
      </div>
      <div className="page-controller">
        <BackButton>← 戻る</BackButton>
        <ForwardButton>進む →</ForwardButton>
      </div>
      <style jsx>{`
        .user_class_wrapper {
          text-align: center;
          margin-bottom: 24px;
        }
        input {
          font-size: 1.1rem;
          width: 120px;
          padding: 4px 8px;
          margin-top: 4px;
          margin-bottom: 24px;
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
