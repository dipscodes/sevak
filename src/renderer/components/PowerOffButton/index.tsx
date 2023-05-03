import { AiOutlinePoweroff } from 'react-icons/ai';

export default function PowerOffButton() {
  return (
    <div className="action-button power-off action-button-common">
      <AiOutlinePoweroff className="rotate-180" size={30} />
    </div>
  );
}
