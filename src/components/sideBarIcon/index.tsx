export default function SidebarIcon({ icon, setPageView, value }: any) {
  return (
    <div
      role="button"
      className="sidebar-icon group"
      onClick={() => {
        setPageView(value);
      }}
      onKeyDown={() => {
        setPageView(value);
      }}
      tabIndex={0}
    >
      {icon}
    </div>
  );
}
