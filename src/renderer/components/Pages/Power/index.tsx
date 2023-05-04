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

  useEffect(() => {
    (async () => {
      const token: string = (
        document.getElementById('selectToken') as HTMLSelectElement
      ).value;
      tokenName.current = token;
      console.log('🚀 ~ file: index.tsx:19 ~ token:', token);
      const dropletListFromDO: string[] =
        await window.electron.getListOfAccesibleDropletIDs(
          token ?? 'No Available Tokens',
          masterPassword ?? ''
        );
      console.log(
        '🚀 ~ file: index.tsx:26 ~ dropletListFromDO:',
        dropletListFromDO
      );
      setDropletList(dropletListFromDO);
    })();
  }, [masterPassword, refresh]);

  const toggleRefresh = () => setRefresh((value) => (value + 1) % 2);

  return (
    <div className="page-common text-text-generic-color overflow-hidden">
      <TopBar>
        <TokenListDropdown toggleRefresh={toggleRefresh} />
      </TopBar>
      <div className="flex flex-row flex-wrap overflow-y-scroll h-[calc(100vh-80px)] hidden-scrollbar justify-around">
        {dropletList[0] === ''
          ? 'No Info'
          : dropletList.map((dropletID) => {
              console.log(
                '🚀 ~ file: index.tsx:39 ~ Power ~ dropletID:',
                dropletID
              );
              return (
                <CardComponent
                  tokenName={tokenName.current}
                  dropletID={dropletID}
                  key={dropletID}
                />
              );
            })}
      </div>
    </div>
  );
}
