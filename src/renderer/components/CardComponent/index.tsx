import { useEffect, useState, useContext, useRef } from 'react';
import { MasterContext, StatusContext } from 'renderer/Context';
import PowerOnButton from '../PowerOnButton';
import PowerOffButton from '../PowerOffButton';
import RebootButton from '../RebootButton';
import ViewButton from '../ViewButton';
import StatusComponent from '../StatusComponent';
import DropletInfoComponent from '../DropletInfoComponent';

interface Props {
  dropletID: string;
  tokenName: string;
  buttonPermission: object;
}

export default function CardComponent({
  dropletID,
  tokenName,
  buttonPermission,
}: Props) {
  const [refresh, setRefresh] = useState(0);
  const spinner = useRef(false);
  const [dropletInformation, setDropletInformation] = useState({});
  const masterPassword = useContext(MasterContext);
  // eslint-disable-next-line no-unused-vars
  const { status, setStatus } = useContext(StatusContext);

  const toggleRefresh = () => {
    setRefresh((value: number) => (value + 1) % 2);
  };

  useEffect(() => {
    // updates the card component.
    (async () => {
      const token: string = (
        document.getElementById('selectToken') as HTMLSelectElement
      ).value;
      const dropletInfo: object = await window.electron.getDropletInfo(
        token ?? '',
        dropletID,
        masterPassword ?? ''
      );
      if (JSON.stringify(dropletID) !== JSON.stringify({})) {
        setDropletInformation(dropletInfo);
      }
      // spinner.current = (dropletInfo as any).status === status[dropletID];
    })();
  }, [masterPassword, refresh, dropletID]);

  useEffect(() => {
    // updates the status component.
    const interval = setInterval(() => {
      if (status[dropletID] === 'reboot') {
        if ((dropletInformation as any).status === 'active')
          spinner.current = true;
        else spinner.current = false;
      }
      toggleRefresh();
    }, 4000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mb-5 mt-5">
      <div className="cardComponent">
        <StatusComponent
          statusClass={(dropletInformation as any).status}
          spinner={(dropletInformation as any).status === status[dropletID]}
          key={refresh}
        />
        <DropletInfoComponent dropletInformation={dropletInformation} />
        <div className="buttonDiv">
          <PowerOnButton
            tokenName={tokenName}
            dropletID={dropletID}
            enabled={
              (buttonPermission as any).power_on ||
              (buttonPermission as any).is_raw_token
            }
            toggleRefresh={toggleRefresh}
          />
          <PowerOffButton
            tokenName={tokenName}
            dropletID={dropletID}
            enabled={
              (buttonPermission as any).power_off ||
              (buttonPermission as any).is_raw_token
            }
            toggleRefresh={toggleRefresh}
          />
          <RebootButton
            tokenName={tokenName}
            dropletID={dropletID}
            enabled={
              (buttonPermission as any).reboot ||
              (buttonPermission as any).is_raw_token
            }
            toggleRefresh={toggleRefresh}
          />
          <ViewButton />
        </div>
      </div>
    </div>
  );
}
