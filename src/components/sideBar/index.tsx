import SidebarIcon from 'components/sideBarIcon';
import { AiOutlinePoweroff, AiOutlineKey, AiOutlineApi } from 'react-icons/ai';
import { BsDroplet } from 'react-icons/bs';

export default function Sidebar({ setPageView }: any) {
  return (
    <div className="h-screen w-16 bg-discord-sidebar">
      <SidebarIcon
        icon=<AiOutlineApi size={30} />
        value="token"
        setPageView={setPageView}
      />
      <SidebarIcon
        icon=<AiOutlinePoweroff size={30} />
        value="power"
        setPageView={setPageView}
      />
      <SidebarIcon
        icon=<BsDroplet size={30} />
        value="droplet"
        setPageView={setPageView}
      />
      <SidebarIcon
        icon=<AiOutlineKey size={30} />
        value="key"
        setPageView={setPageView}
      />
    </div>
  );
}
