import TokenListDropdown from 'renderer/components/TokenListDropdown';
import TopBar from 'renderer/components/TopBar';

export default function Power() {
  return (
    <div className="page-common text-text-generic-color">
      <TopBar>
        <TokenListDropdown />
      </TopBar>
    </div>
  );
}
