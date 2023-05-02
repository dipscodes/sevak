import TokenListDropdown from 'renderer/components/TokenListDropdown';
import TopBar from 'renderer/components/TopBar';

export default function Droplet() {
  return (
    <div className="page-common text-text-generic-color">
      <TopBar>
        <TokenListDropdown />
      </TopBar>
    </div>
  );
}
