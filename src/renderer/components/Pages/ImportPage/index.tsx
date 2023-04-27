import { useContext } from 'react';
import MasterContext from 'renderer/Context';
import TokenListDropdown from 'renderer/components/TokenListDropdown';
import TopBar from 'renderer/components/TopBar';

export default function Import() {
  const masterPassword = useContext(MasterContext);

  const handleOnClick = async (): Promise<void> => {
    const tokenName: string = (
      document.getElementById('selectToken') as HTMLSelectElement
    ).value;
    const testResult: any = await window.electron.getTokenSpecificCheckboxNode(
      tokenName,
      masterPassword ?? ''
    );
    (document.getElementById('information') as HTMLDivElement).innerText =
      JSON.stringify(testResult);
    // console.log(testResult);
  };

  return (
    <div className="page-common text-text-generic-color">
      <TopBar>
        <TokenListDropdown />
      </TopBar>
      <div className="flex flex-row h-[calc(100vh-80px)]">
        <div className="w-4/12">
          <button
            className="discord-button"
            type="button"
            onClick={handleOnClick}
          >
            Test
          </button>
        </div>
        <div className="w-8/12 bg-discord-cross-color" id="information">
          No Info
        </div>
      </div>
    </div>
  );
}
