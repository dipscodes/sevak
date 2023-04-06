import { ReactElement, useEffect, useState } from 'react';
import RowOfToken from '../RowOfToken';

export default function ListOfTokens(): ReactElement {
  const [listOfTokenNames, setListOfTokenNames] = useState(['']);
  const [permissions, setPermissions] = useState('');

  useEffect(() => {
    (async () => {
      const tokenNames: string[] = await window.electron.getListOfAllTokens();
      setListOfTokenNames(tokenNames);
    })();
  }, []);

  return (
    <div className="w-full flex flex-row">
      <div className="w-6/12">
        {listOfTokenNames.map((name) => {
          return name === '' ? (
            <span className="text-text-generic-color" key="nothing">
              No Available Tokens
            </span>
          ) : (
            <RowOfToken
              name={name}
              key={name}
              setPermissions={(p: string) => {
                setPermissions(p);
              }}
            />
          );
        })}
      </div>
      <div className="w-6/12 flex flex-grow h-[calc(100vh-80px)] text-text-generic-color bg-discord-cross-color">
        {permissions}
      </div>
    </div>
  );
}
