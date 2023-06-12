interface Props {
  dropletInformation: object;
}

export default function DropletInfoComponent({ dropletInformation }: Props) {
  let name = 'Not Available';
  let spec = 'Not Available';
  let v4ip = 'V4: Not Available';
  let v6ip = 'V6: Not Available';

  if (JSON.stringify(dropletInformation) !== JSON.stringify({})) {
    name = (dropletInformation as any).name;
    spec = `${(dropletInformation as any).vcpus} Cores, ${
      (dropletInformation as any).memory / 1024
    } GB, ${(dropletInformation as any).image.distribution}`;

    const availablev4: object[] = ((dropletInformation as any).networks as any)
      .v4;
    const availablev6: object[] = ((dropletInformation as any).networks as any)
      .v6;

    availablev4.forEach((value) => {
      if ((value as any).type === 'public')
        v4ip = `V4: ${(value as any).ip_address as string}`;
    });
    availablev6.forEach((value) => {
      if ((value as any).type === 'public')
        v6ip = `V6: ${(value as any).ip_address as string}`;
    });
  }

  return (
    <div className="dropletInfoDiv">
      <div className="card">
        <span className="dropletName">{name}</span>
        <span className="dropletInfo">{spec}</span>
        <span className="dropletIP">{v4ip}</span>
        <span className="dropletIP">{v6ip}</span>
      </div>
    </div>
  );
}
