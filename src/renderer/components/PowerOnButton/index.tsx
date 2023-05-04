import { useContext } from 'react';
import { AiOutlinePoweroff } from 'react-icons/ai';
import { MasterContext, StatusContext } from 'renderer/Context';

interface Props {
  tokenName: string;
  dropletID: string;
  toggleRefresh: Function;
}

export default function PowerOnButton({
  tokenName,
  dropletID,
  toggleRefresh,
}: Props) {
  const { status, setStatus } = useContext(StatusContext);
  const masterPassword = useContext(MasterContext);

  function handlePowerOn() {
    (async () => {
      const result = await window.electron.powerOnDroplet(
        tokenName,
        dropletID,
        masterPassword ?? ''
      );
      if (result) {
        status[dropletID] = 'off';
        setStatus(status);
        toggleRefresh();
      }
    })();
  }
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      className="action-button power-on action-button-common"
      onClick={() => {
        handlePowerOn();
      }}
    >
      <AiOutlinePoweroff size={30} />
    </div>
  );
}
