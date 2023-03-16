import Page from 'components/Page';
import SidebarIcon from 'components/SideBarIcon';
import { useState } from 'react';
// import fs from 'fs';
import {
  AiOutlinePoweroff,
  AiOutlineKey,
  AiOutlineApi,
  AiOutlinePlusCircle,
} from 'react-icons/ai';
import { BsDroplet } from 'react-icons/bs';

// function getAllPages() {
//   const allPages = fs
//     .readdirSync('components/Pages', {
//       withFileTypes: true,
//     })
//     .filter((dirent: any) => dirent.isDirectory());
//   return allPages;
// }

export default function Sidebar() {
  // eslint-disable-next-line no-unused-vars
  const [pageView, setPageView] = useState('Token');
  // const allPages = getAllPages();
  // eslint-disable-next-line no-console
  // console.log(allPages);

  return (
    <div className="flex flex-row w-full">
      <div className="h-screen w-16 bg-discord-sidebar">
        <SidebarIcon
          icon=<AiOutlineApi size={30} />
          onClick={() => {
            setPageView('Token');
          }}
        />
        <SidebarIcon
          icon=<AiOutlinePoweroff size={30} />
          onClick={() => {
            setPageView('Power');
          }}
        />
        <SidebarIcon
          icon=<BsDroplet size={30} />
          onClick={() => {
            setPageView('Droplet');
          }}
        />
        <SidebarIcon
          icon=<AiOutlineKey size={30} />
          onClick={() => {
            setPageView('Key');
          }}
        />
        <SidebarIcon
          icon=<AiOutlinePlusCircle size={30} />
          onClick={() => {
            setPageView('Import');
          }}
        />
      </div>
      <Page pageView={pageView} id="Token" />
      <Page pageView={pageView} id="Power" />
      <Page pageView={pageView} id="Droplet" />
      <Page pageView={pageView} id="Key" />
      <Page pageView={pageView} id="Import" />
    </div>
  );
}
