import TokenListDropdown from 'renderer/components/TokenListDropdown';
import TopBar from 'renderer/components/TopBar';
import CardComponent from 'renderer/components/CardComponent';

export default function Power() {
  return (
    <div className="page-common text-text-generic-color overflow-hidden">
      <TopBar>
        <TokenListDropdown />
      </TopBar>
      <div className="flex flex-row flex-wrap overflow-y-scroll h-[calc(100vh-80px)] hidden-scrollbar justify-around">
        <CardComponent />
        <CardComponent />
        <CardComponent />
        <CardComponent />
        <CardComponent />
        <CardComponent />
      </div>
    </div>
  );
}
