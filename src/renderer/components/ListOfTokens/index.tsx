import { ReactElement, useState } from 'react';
import RowOfToken from '../RowOfToken';

interface Props {
  refresh: boolean;
  onShowList: Function;
}

export default function ListOfTokens({
  refresh,
  onShowList,
}: Props): ReactElement {
  const [listOfTokenNames, setListOfTokenNames] = useState(['']);

  (async () => {
    if (refresh) {
      const tokenNames: string[] = await window.electron.getListOfAllTokens();
      setListOfTokenNames(tokenNames);
    }
  })();
  // eslint-disable-next-line no-console
  console.log(listOfTokenNames);
  onShowList();

  return (
    <div>
      {listOfTokenNames.map((name) => {
        return name === '' ? (
          <span className="text-text-generic-color">No Available Tokens</span>
        ) : (
          <RowOfToken name={name} key={name} />
        );
      })}
    </div>
  );
}
