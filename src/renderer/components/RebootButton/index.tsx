import { useContext } from 'react';
import { MasterContext, StatusContext } from 'renderer/Context';
import { GrRotateRight } from 'react-icons/gr';

interface Props {
  tokenName: string;
  dropletID: string;
  toggleRefresh: Function;
  enabled?: boolean;
}

export default function RebootButton({
  tokenName,
  dropletID,
  toggleRefresh,
  enabled,
}: Props) {
  const { status, setStatus } = useContext(StatusContext);
  const masterPassword = useContext(MasterContext);

  function handleReboot() {
    (async () => {
      const result = await window.electron.rebootDroplet(
        tokenName,
        dropletID,
        masterPassword
      );

      if (result) {
        status[dropletID] = 'reboot';
        setStatus(status);
        toggleRefresh();
      }
    })();
  }
  if (enabled)
    return (
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
      <div
        className="action-button reboot action-button-common"
        onClick={() => {
          handleReboot();
        }}
      >
        <GrRotateRight size={30} />
      </div>
    );
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div className="action-button-muted reboot-muted action-button-muted-common">
      <GrRotateRight size={30} />
    </div>
  );
}

RebootButton.defaultProps = {
  enabled: false,
};
