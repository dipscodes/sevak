import { BsChevronRight } from 'react-icons/bs';

interface Props {
  name: string;
}

export default function RowOfToken({ name }: Props) {
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
    </div>
  );
}
