import { useContext, useEffect, useRef, useState } from 'react';
import TokenListDropdown from 'renderer/components/TokenListDropdown';
import TopBar from 'renderer/components/TopBar';
import CardComponent from 'renderer/components/CardComponent';
import { MasterContext } from 'renderer/Context';

export default function Power() {
  const [dropletList, setDropletList] = useState(['']);
  const [refresh, setRefresh] = useState(0);
  const masterPassword = useContext(MasterContext);
  const tokenName = useRef('');
  const dropletPermission = useRef({});

  useEffect(() => {
    (async () => {
      const token: string = (
        document.getElementById('selectToken') as HTMLSelectElement
      ).value;
      tokenName.current = token;
      const dropletListFromDO: string[] =
        await window.electron.getListOfAccesibleDropletIDs(
          token ?? 'No Available Tokens',
          masterPassword
        );

      const permission = await window.electron.getTokenPermission(
        token ?? 'No Available Tokens',
        masterPassword
      );
      dropletPermission.current = permission;
      setDropletList(dropletListFromDO);
    })();
  }, [masterPassword, refresh]);

  const toggleRefresh = () => setRefresh((value) => (value + 1) % 2);

  return (
    <div className="page-common text-text-generic-color overflow-hidden">
      <TopBar>
        <TokenListDropdown toggleRefresh={toggleRefresh} />
      </TopBar>
      <div
        className="flex flex-row flex-wrap overflow-y-scroll h-[calc(100vh-80px)] hidden-scrollbar justify-around"
        key={refresh}
      >
        {dropletList[0] === ''
          ? 'No Info'
          : dropletList.map((dropletID) => {
              const temp = {
                is_raw_token: (dropletPermission.current as any).is_raw_token,
              };
              const buttonPermission = {
                ...temp,
                ...(dropletPermission.current as any).permissions.droplets[
                  dropletID
                ],
              };
              return (
                <CardComponent
                  tokenName={tokenName.current}
                  dropletID={dropletID.split('~')[0]}
                  buttonPermission={buttonPermission}
                  key={dropletID}
                />
              );
            })}
      </div>
    </div>
  );
}
