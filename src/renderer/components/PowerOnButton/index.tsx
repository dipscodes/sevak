import { useContext } from 'react';
import { AiOutlinePoweroff } from 'react-icons/ai';
import { StatusContext } from 'renderer/Context';

interface Props {
  dropletID: string;
  toggleRefresh: Function;
}

export default function PowerOnButton({ dropletID, toggleRefresh }: Props) {
  const { status, setStatus } = useContext(StatusContext);
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      className="action-button power-on action-button-common"
      onClick={() => {
        status[dropletID] = 'off';
        setStatus(status);
        toggleRefresh();
        console.log(status);
      }}
    >
      <AiOutlinePoweroff size={30} />
    </div>
  );
}
