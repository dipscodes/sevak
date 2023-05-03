import { useContext, useEffect } from 'react';
import { StatusContext } from 'renderer/Context';

interface Props {
  dropletID: string;
  statusClass: string;
  toggleRefresh: Function;
}

export default function StatusComponent({
  dropletID,
  statusClass,
  toggleRefresh,
}: Props) {
  const statusColor: object = {
    off: 'bg-red-500',
    active: 'bg-green-500',
  };

  // eslint-disable-next-line no-unused-vars
  const { status, setStatus } = useContext(StatusContext);

  useEffect(() => {
    const interval = setInterval(() => {
      toggleRefresh();
      // setGlobalStatus(status[dropletID]);
    }, 5000);

    console.time('status');
    console.log(status[dropletID], statusClass);
    console.timeEnd('status');

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {status[dropletID] === statusClass ? (
        <svg className="spinner" viewBox="0 0 50 50">
          <circle
            className="path"
            cx="25"
            cy="25"
            r="20"
            fill="none"
            strokeWidth="5"
          />
        </svg>
      ) : (
        <div className={`status ${statusColor[statusClass]}`} />
      )}
    </div>
  );
}
