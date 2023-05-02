import { AiOutlinePoweroff } from 'react-icons/ai';
import { GrRotateRight } from 'react-icons/gr';
import { VscOpenPreview } from 'react-icons/vsc';

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
          <div className="action-button power-on action-button-common">
            <AiOutlinePoweroff size={30} />
          </div>
          <div className="action-button power-off action-button-common">
            <AiOutlinePoweroff className="rotate-180" size={30} />
          </div>
          <div className="action-button reboot action-button-common">
            <GrRotateRight size={30} />
          </div>
          <div className="action-button view action-button-common">
            <VscOpenPreview size={30} />
          </div>
        </div>
      </div>
    </div>
  );
}
