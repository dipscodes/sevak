interface Props {
  statusClass: string;
}

export default function StatusComponent({ statusClass }: Props) {
  return <div className={`status ${statusClass}`} />;
}
