import { ChangeEvent } from 'react';
import { BackButton } from '../OrderedPages';
import { useApplyFormContext } from '.';

function Message() {
  const { message, setMessage } = useApplyFormContext();

  const onMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  return (
    <>
      <div className="message_wrapper">
        <p className="instruction">
          募集主に伝えたいことがあれば入力してください
        </p>
        <textarea
          id="message"
          name="message"
          onChange={onMessageChange}
          value={message}
          aria-label="募集主へのメッセージ"
        ></textarea>
      </div>
      <div className="page-controller">
        <BackButton>← 戻る</BackButton>
        <button type="submit">送信</button>
      </div>
      <style jsx>{`
        .instruction {
          margin-bottom: 4px;
        }
        .message_wrapper {
          text-align: center;
        }
        .message_wrapper textarea {
          width: 80%;
          height: 180px;
          padding: 8px;
          max-width: 420px;
          margin-bottom: 24px;
        }
        .page-controller {
          display: flex;
          align-items: center;
          justify-content: space-evenly;
        }
        .page-controller button {
          border-radius: 8px;
          border: 0;
          padding: 8px 24px;
          color: #ffffff;
          background-color: #25a5ec;
          font-weight: 800;
        }
        .page-controller button:hover {
          background-color: #36b3f7;
        }
      `}</style>
    </>
  );
}

export default Message;
