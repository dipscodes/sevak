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
      console.log(result);
      if (result) {
        status[dropletID] = 'off';
        setStatus(status);
        toggleRefresh();
        // console.log(tokenName, dropletID, masterPassword);
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
