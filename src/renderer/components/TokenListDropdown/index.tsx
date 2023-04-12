import { useEffect, useState } from 'react';

export default function TokenListDropdown() {
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
        id="selectToken"
        name="token"
        className="w-40 text-center bg-gray-700 rounded-lg pb-1 text-white"
      >
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
    </div>
  );
}
