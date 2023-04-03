interface Props {
  name: string;
}

export default function RowOfToken({ name }: Props) {
  return (
    <div>
      <span>{name}</span>
      <button type="button">Delete</button>
    </div>
  );
}
