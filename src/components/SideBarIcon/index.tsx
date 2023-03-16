export default function SidebarIcon({ icon, onClick, onKeyDown }: any) {
  return (
    <div
      role="button"
      className="sidebar-icon group"
      onClick={onClick}
      onKeyDown={onKeyDown}
      tabIndex={0}
    >
      {icon}
    </div>
  );
}
