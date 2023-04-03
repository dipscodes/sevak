import { ReactElement, useEffect, useState } from 'react';
import RowOfToken from '../RowOfToken';

export default function ListOfTokens(): ReactElement {
  const [listOfTokenNames, setListOfTokenNames] = useState(['']);

  useEffect(() => {
    window.electron
      .getListOfAllTokens()
      .then((value) => {
        setListOfTokenNames(value);
        return '';
      })
      .catch((error) => {
        throw error;
      });
  }, []);

  return (
    <div>
      {listOfTokenNames.map((name) => {
        return <RowOfToken name={name} key={name} />;
      })}
    </div>
  );
}
