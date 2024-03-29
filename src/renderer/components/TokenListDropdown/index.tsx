import { useContext, useEffect, useState } from 'react';
import { MasterContext } from 'renderer/Context';

interface Props {
  all?: boolean;
  className?: string;
  toggleRefresh?: Function;
}

export default function TokenListDropdown({
  all,
  className,
  toggleRefresh,
}: Props) {
  const [listOfTokenNames, setListOfTokenNames] = useState(['']);
  const masterPassword = useContext(MasterContext);

  const classNames = `w-40 text-center bg-gray-700 rounded-lg pb-1 text-white ${className}`;

  useEffect(() => {
    (async () => {
      let tokenNames: string[] = [''];
      if (all) {
        tokenNames = await window.electron.getListOfAllTokens();
      } else {
        tokenNames = await window.electron.getListOfAllRawTokens(
          masterPassword
        );
      }
      if (toggleRefresh) toggleRefresh();
      if (JSON.stringify(tokenNames) === JSON.stringify([])) tokenNames = [''];

      setListOfTokenNames(tokenNames);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <select
      id="selectToken"
      name="token"
      className={classNames}
      onChange={() => {
        if (toggleRefresh) toggleRefresh();
      }}
    >
      {listOfTokenNames.map((name, index) => {
        if (name !== '' && index === 0) {
          return (
            <option
              className="hover:bg-gray-100"
              value={name}
              key={name}
              defaultValue={name}
            >
              {name}
            </option>
          );
        }
        return name === '' ? (
          <option className="text-white" key="nothing">
            No Available Tokens
          </option>
        ) : (
          <option className="hover:bg-gray-100" value={name} key={name}>
            {name}
          </option>
        );
      })}
    </select>
  );
}

TokenListDropdown.defaultProps = {
  all: true,
  className: '',
  toggleRefresh: () => {},
};
