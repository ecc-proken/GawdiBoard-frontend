function Completed() {
  return (
    <div className="completed-message">
      <p>募集主に連絡を送りました。</p>
      <p>
        募集主からあなたのメールアドレス宛に連絡が届くまでしばらくお待ちください
      </p>
      <style jsx>{`
        .completed-message {
          margin-top: 24px;
          text-align: center;
        }
        .completed-message p {
          margin-bottom: 12px;
        }
      `}</style>
    </div>
  );
}

export default Completed;
