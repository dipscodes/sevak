import { useContext, useEffect, useState } from 'react';
import TokenListDropdown from 'renderer/components/TokenListDropdown';
import TopBar from 'renderer/components/TopBar';
import CardComponent from 'renderer/components/CardComponent';
import { MasterContext } from 'renderer/Context';

export default function Power() {
  const [dropletList, setDropletList] = useState([{}]);
  const [refresh, setRefresh] = useState(0);
  const masterPassword = useContext(MasterContext);

  useEffect(() => {
    (async () => {
      const tokenName: string = (
        document.getElementById('selectToken') as HTMLSelectElement
      ).value;
      const dropletListFromDO: object[] =
        await window.electron.getListOfDropletsFromDO(
          tokenName ?? '',
          masterPassword ?? ''
        );
      console.log(tokenName);
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
        {JSON.stringify(dropletList[0]) === JSON.stringify({})
          ? 'No Info'
          : dropletList.map((droplet) => {
              const dname: string = (droplet as any).name;
              const dropletId: string = (droplet as any).id;
              const info: string = `${(droplet as any).vcpus} Cores, ${
                (droplet as any).memory / 1024
              } GB, ${(droplet as any).image.distribution}`;
              const availablev4: object[] = (droplet as any).networks.v4;
              const availablev6: object[] = (droplet as any).networks.v6;
              const statusClass = (droplet as any).status;

              let v4ip = 'Not Available';
              let v6ip = 'Not Available';

              availablev4.forEach((value) => {
                if ((value as any).type === 'public')
                  v4ip = (value as any).ip_address;
              });
              availablev6.forEach((value) => {
                if ((value as any).type === 'public')
                  v6ip = (value as any).ip_address;
              });

              v4ip = `V4: ${v4ip}`;
              v6ip = `V6: ${v6ip}`;

              return (
                <CardComponent
                  dropletID={dropletId}
                  dropletName={dname}
                  dropletInfo={info}
                  dropletV4IP={v4ip}
                  dropletV6IP={v6ip}
                  statusClass={statusClass}
                  key={dropletId}
                />
              );
            })}
      </div>
    </div>
  );
}
