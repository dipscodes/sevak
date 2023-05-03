import { useState } from 'react';
import PowerOnButton from '../PowerOnButton';
import PowerOffButton from '../PowerOffButton';
import RebootButton from '../RebootButton';
import ViewButton from '../ViewButton';
import StatusComponent from '../StatusComponent';

interface Props {
  dropletID: string;
  dropletName: string;
  dropletInfo: string;
  dropletV4IP: string;
  dropletV6IP: string;
  statusClass?: string;
  tokenName: string;
}

export default function CardComponent({
  dropletID,
  dropletName,
  dropletInfo,
  dropletV4IP,
  dropletV6IP,
  statusClass,
  tokenName,
}: Props) {
  const [refresh, setRefresh] = useState(0);

  const toggleRefresh = () => {
    setRefresh((value: number) => (value + 1) % 2);
  };

  return (
    <div className="mb-5 mt-5">
      <div className="cardComponent">
        <StatusComponent
          dropletID={dropletID}
          statusClass={statusClass ?? ''}
          toggleRefresh={toggleRefresh}
          key={refresh}
        />
        <div className="dropletInfoDiv">
          <div className="card">
            <span className="dropletName">{dropletName}</span>
            <span className="dropletInfo">{dropletInfo}</span>
            <span className="dropletIP">{dropletV4IP}</span>
            <span className="dropletIP">{dropletV6IP}</span>
          </div>
        </div>
        <div className="buttonDiv">
          <PowerOnButton
            tokenName={tokenName}
            dropletID={dropletID}
            toggleRefresh={toggleRefresh}
          />
          <PowerOffButton dropletID={dropletID} toggleRefresh={toggleRefresh} />
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
