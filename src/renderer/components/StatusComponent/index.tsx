interface Props {
  statusClass: string;
  spinner: boolean;
}

export default function StatusComponent({ statusClass, spinner }: Props) {
  const statusColor: object = {
    off: 'bg-red-500',
    active: 'bg-green-500',
  };

  return (
    <div>
      {spinner ? (
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
