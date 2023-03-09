// import { BsPlus, BsFillLightningFill, BsGearFill } from 'react-icons/bs';
import { FaFire, FaPoo } from 'react-icons/fa';

export default function Sidebar() {
  return (
    <div className="h-screen w-16 bg-discord-sidebar">
      <div className="sidebar-icon group">
        <FaFire size={40} />
      </div>
      <div className="sidebar-icon group">
        <FaPoo size={40} />
      </div>
    </div>
  );
}
