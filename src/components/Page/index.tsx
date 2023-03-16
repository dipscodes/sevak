import * as SidebarComponents from 'components/Pages';

export default function Page({ pageView, id }: any) {
  const Token = SidebarComponents[pageView];
  return pageView === id ? <Token /> : null;
}
