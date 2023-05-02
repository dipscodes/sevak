import { useEffect, useState } from 'react';

interface Props {
  className: string;
}

export default function TokenListDropdown({ className }: Props) {
  const [listOfTokenNames, setListOfTokenNames] = useState(['']);

  const classNames = `w-40 text-center bg-gray-700 rounded-lg pb-1 text-white ${className}`;

  useEffect(() => {
    (async () => {
      const tokenNames: string[] = await window.electron.getListOfAllTokens();
      setListOfTokenNames(tokenNames);
    })();
  }, []);

  return (
    <select id="selectToken" name="token" className={classNames}>
      {listOfTokenNames.map((name, index) => {
        if (name !== '' && index === 0) {
          return (
            <option
              className="hover:bg-gray-100"
              value={name}
              key={name}
              selected
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
