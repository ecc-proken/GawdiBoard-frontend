function Completed() {
  return (
    <div className="completed-message">
      <p className="head-message">募集主に連絡を送りました。</p>
      <p>
        募集主からあなたのメールアドレス宛に連絡が届くまでしばらくお待ちください
      </p>
      <style jsx>{`
        .completed-message {
          text-align: center;
        }
        .head-message {
          font-weight: 700;
          font-size: 1.2rem;
          margin-bottom: 20px;
        }
        .completed-message p {
          margin-bottom: 12px;
        }
      `}</style>
    </div>
  );
}

export default Completed;
