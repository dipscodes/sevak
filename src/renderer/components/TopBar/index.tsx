import { ReactElement } from 'react';

interface Props {
  children: ReactElement[] | ReactElement;
}

export default function TopBar({ children }: Props) {
  return (
    <div className="flex flex-row justify-center pt-5 pb-5 bg-discord-bg-1 shadow-lg h-[80px]">
      {children}
    </div>
  );
}
