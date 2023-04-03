import { ReactElement, useEffect, useState } from 'react';
import RowOfToken from '../RowOfToken';

export default function ListOfTokens(): ReactElement {
  const [listOfTokenNames, setListOfTokenNames] = useState(['']);

  useEffect(() => {
    (async () => {
      const tokenNames: string[] = await window.electron.getListOfAllTokens();
      setListOfTokenNames(tokenNames);
    })();
  }, []);

  return (
    <div>
      {listOfTokenNames.map((name) => {
        return <RowOfToken name={name} key={name} />;
      })}
    </div>
  );
}
