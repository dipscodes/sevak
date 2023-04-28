export default function CardComponent() {
  return (
    <div className="mb-5 mt-5">
      <div className="cardComponent">
        <div className="status" />
        <div className="dropletInfoDiv">
          <div className="card">
            <span className="dropletName">LyadhCraft</span>
            <span className="dropletInfo">4 Cores, 8 GB, Ubuntu</span>
            <span className="dropletIP">IP: 6.6.6.6</span>
          </div>
        </div>
        <div className="buttonDiv">
          <div className="action-button power-on" />
          <div className="action-button power-off" />
          <div className="action-button reboot" />
          <div className="action-button view" />
        </div>
      </div>
    </div>
  );
}
