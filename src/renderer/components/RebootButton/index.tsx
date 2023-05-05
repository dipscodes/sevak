import { GrRotateRight } from 'react-icons/gr';

interface Props {
  enabled?: boolean;
}

export default function RebootButton({ enabled }: Props) {
  if (enabled)
    return (
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
      <div className="action-button reboot action-button-common">
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
