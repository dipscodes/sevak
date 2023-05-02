import { AiOutlinePoweroff } from 'react-icons/ai';
import { GrRotateRight } from 'react-icons/gr';
import { VscOpenPreview } from 'react-icons/vsc';

interface Props {
  dropletName: string;
  dropletInfo: string;
  dropletV4IP: string;
  dropletV6IP: string;
  statusClass?: string;
}

export default function CardComponent({
  dropletName,
  dropletInfo,
  dropletV4IP,
  dropletV6IP,
  statusClass,
}: Props) {
  return (
    <div className="mb-5 mt-5">
      <div className="cardComponent">
        <div className={`status ${statusClass}`} />
        <div className="dropletInfoDiv">
          <div className="card">
            <span className="dropletName">{dropletName}</span>
            <span className="dropletInfo">{dropletInfo}</span>
            <span className="dropletIP">{dropletV4IP}</span>
            <span className="dropletIP">{dropletV6IP}</span>
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

CardComponent.defaultProps = {
  statusClass: '',
};
