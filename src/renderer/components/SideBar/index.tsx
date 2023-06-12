import Page from 'renderer/components/Page';
import SidebarIcon from 'renderer/components/SideBarIcon';
import { useState, useRef, useMemo } from 'react';
import { StatusContext } from 'renderer/Context';
import {
  AiOutlinePoweroff,
  AiOutlineKey,
  AiOutlineApi,
  AiOutlinePlusCircle,
  AiOutlineExport,
} from 'react-icons/ai';
import { BsDroplet } from 'react-icons/bs';

function getAllPages(): Object {
  const sideBarIcons = {
    Token: <AiOutlineApi size={30} />,
    Power: <AiOutlinePoweroff size={30} />,
    Droplet: <BsDroplet size={30} />,
    Key: <AiOutlineKey size={30} />,
    Export: <AiOutlineExport size={30} />,
    Import: <AiOutlinePlusCircle size={30} />,
  };
  return sideBarIcons;
}

export default function Sidebar() {
  // eslint-disable-next-line no-unused-vars
  const [pageView, setPageView] = useState('Token');
  const icons = useRef(getAllPages());
  const [status, setStatus] = useState({});

  const contextValue = useMemo(() => {
    return {
      status,
      setStatus,
    };
  }, [status, setStatus]);

  return (
    <StatusContext.Provider value={contextValue}>
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
    </StatusContext.Provider>
  );
}
