import { useContext } from 'react';
import { BsChevronRight } from 'react-icons/bs';
import MasterContext from 'renderer/Context';

interface Props {
  name: string;
}

export default function RowOfToken({ name }: Props) {
  const masterPassword = useContext(MasterContext);
  const showPermissionString = async () => {
    const permissionString = await window.electron.getTokenPermission(
      name,
      masterPassword ?? ''
    );
    // eslint-disable-next-line no-console
    console.log(JSON.parse(permissionString));
  };

  return (
    <div className="w-80 h-10 flex flex-row justify-between py-2 px-4 my-1">
      <div className="flex flex-row text-text-generic-color">
        <BsChevronRight className="my-auto" size={18} />
        <span className="pl-2 font-semibold">{name}</span>
      </div>

      <button
        className="rounded-full px-2 bg-red-500 text-white shadow-lg hover:shadow-none font-light"
        type="button"
      >
        Delete
      </button>

      <button
        className="rounded-full px-2 bg-green-500 text-white shadow-lg hover:shadow-none font-light"
        type="button"
        onClick={showPermissionString}
      >
        Show Permission
      </button>
    </div>
  );
}
