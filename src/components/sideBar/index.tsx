import SidebarIcon from 'components/sideBarIcon';
import { AiOutlinePoweroff, AiOutlineKey, AiOutlineApi } from 'react-icons/ai';
import { BsDroplet } from 'react-icons/bs';

export default function Sidebar() {
  return (
    <div className="h-screen w-16 bg-discord-sidebar">
      <SidebarIcon icon=<AiOutlineApi size={30} /> />
      <SidebarIcon icon=<AiOutlinePoweroff size={30} /> />
      <SidebarIcon icon=<BsDroplet size={30} /> />
      <SidebarIcon icon=<AiOutlineKey size={30} /> />
    </div>
  );
}
