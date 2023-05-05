import { useContext } from 'react';
import { AiOutlinePoweroff } from 'react-icons/ai';
import { MasterContext, StatusContext } from 'renderer/Context';

interface Props {
  tokenName: string;
  dropletID: string;
  toggleRefresh: Function;
  enabled?: boolean;
}

export default function PowerOnButton({
  tokenName,
  dropletID,
  toggleRefresh,
  enabled,
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
  if (enabled)
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
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div className="action-button-muted power-on-muted action-button-muted-common">
      <AiOutlinePoweroff size={30} />
    </div>
  );
}

PowerOnButton.defaultProps = {
  enabled: false,
};
