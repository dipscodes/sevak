import { useContext } from 'react';
import { AiOutlinePoweroff } from 'react-icons/ai';
import { MasterContext, StatusContext } from 'renderer/Context';

interface Props {
  tokenName: string;
  dropletID: string;
  toggleRefresh: Function;
}

export default function PowerOffButton({
  tokenName,
  dropletID,
  toggleRefresh,
}: Props) {
  const { status, setStatus } = useContext(StatusContext);
  const masterPassword = useContext(MasterContext);

  function handlePowerOff() {
    (async () => {
      const result = await window.electron.powerOffDroplet(
        tokenName,
        dropletID,
        masterPassword ?? ''
      );
      if (result) {
        status[dropletID] = 'active';
        setStatus(status);
        toggleRefresh();
      }
    })();
  }
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      className="action-button power-off action-button-common"
      onClick={() => {
        handlePowerOff();
      }}
    >
      <AiOutlinePoweroff className="rotate-180" size={30} />
    </div>
  );
}
