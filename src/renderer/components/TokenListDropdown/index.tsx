import { useEffect, useState, ChangeEventHandler } from 'react';

interface Props {
  onChange: ChangeEventHandler<HTMLSelectElement>;
}

export default function TokenListDropdown({ onChange }: Props) {
  const [listOfTokenNames, setListOfTokenNames] = useState(['']);

  useEffect(() => {
    (async () => {
      const tokenNames: string[] = await window.electron.getListOfAllTokens();
      setListOfTokenNames(tokenNames);
    })();
  }, []);

  return (
    <div className="flex flex-row justify-center pt-5 pb-5 bg-discord-bg-1 shadow-lg">
      <select
        name="token"
        className="w-40 text-center bg-gray-700 rounded-lg pb-1 text-white"
        onChange={onChange}
      >
        {listOfTokenNames.map((name) => {
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
    </div>
  );
}
