import { useContext } from 'react';
import MasterContext from 'renderer/Context';

export default function Import() {
  const masterPassword = useContext(MasterContext);

  const handleOnClick = async (): Promise<void> => {
    const tokenName = 'dToken';
    const testResult: any = await window.electron.getTokenSpecificCheckboxNode(
      tokenName,
      masterPassword ?? ''
    );
    (document.getElementById('information') as HTMLDivElement).innerText =
      JSON.stringify(testResult);
    // console.log(testResult);
  };

  return (
    <div className="page-common text-text-generic-color flex flex-row">
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
  );
}
