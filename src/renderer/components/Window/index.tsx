/* eslint-disable no-console */
import Sidebar from 'renderer/components/SideBar';
import { useState } from 'react';
import { MasterContext } from 'renderer/Context';
import MasterPasswordWindow from '../MasterPasswordWindow';

export default function Window() {
  const [isMasterPasswordGiven, setIsMasterPasswordGiven] = useState(false);
  const [masterPassword, setMasterPassword] = useState('');

  function openSidebar(password: string): void {
    setMasterPassword(password);
    setIsMasterPasswordGiven(true);
  }

  return (
    <MasterContext.Provider value={masterPassword}>
      <div className="flex flex-row">
        {isMasterPasswordGiven ? (
          <Sidebar />
        ) : (
          <MasterPasswordWindow
            onMasterPasswordGiven={(password: string) => {
              openSidebar(password);
            }}
          />
        )}
      </div>
    </MasterContext.Provider>
  );
}
