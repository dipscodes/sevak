import PowerOnButton from '../PowerOnButton';
import PowerOffButton from '../PowerOffButton';
import RebootButton from '../RebootButton';
import ViewButton from '../ViewButton';
import StatusComponent from '../StatusComponent';

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
        <StatusComponent statusClass={statusClass ?? ''} />
        <div className="dropletInfoDiv">
          <div className="card">
            <span className="dropletName">{dropletName}</span>
            <span className="dropletInfo">{dropletInfo}</span>
            <span className="dropletIP">{dropletV4IP}</span>
            <span className="dropletIP">{dropletV6IP}</span>
          </div>
        </div>
        <div className="buttonDiv">
          <PowerOnButton />
          <PowerOffButton />
          <RebootButton />
          <ViewButton />
        </div>
      </div>
    </div>
  );
}

CardComponent.defaultProps = {
  statusClass: '',
};
