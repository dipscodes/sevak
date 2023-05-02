import Page from 'renderer/components/Page';
import SidebarIcon from 'renderer/components/SideBarIcon';
import { useState, useRef } from 'react';
import getAllPages from 'renderer/utils/SideBar';

export default function Sidebar() {
  // eslint-disable-next-line no-unused-vars
  const [pageView, setPageView] = useState('Token');
  const icons = useRef(getAllPages());

  return (
    <div className="flex flex-row w-full">
      <div className="h-screen w-16 bg-discord-sidebar">
        {Object.keys(icons.current).map((key: string) => (
          <SidebarIcon
            key={key}
            icon={icons.current[key]}
            onClick={() => {
              setPageView(key);
            }}
          />
        ))}
      </div>
      <Page pageView={pageView} id="Token" />
      <Page pageView={pageView} id="Power" />
      <Page pageView={pageView} id="Droplet" />
      <Page pageView={pageView} id="Key" />
      <Page pageView={pageView} id="Export" />
      <Page pageView={pageView} id="Import" />
    </div>
  );
}
