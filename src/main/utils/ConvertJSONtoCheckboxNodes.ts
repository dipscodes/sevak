function getLabel(key: string): string {
  if (key.split('~')[1] === undefined) {
    return key;
  }
  return key.split('~')[1];
}

function getValue(key: string, prefix: string): string {
  if (prefix === '') {
    return key;
  }

  try {
    return `${prefix}~${key.split('~')[0]}`;
  } catch (error) {
    return `${prefix}~${key}`;
  }
}

export default function convertJSONtoCheckboxNodes(
  jsonObject: object,
  prefix: string
) {
  const listOfCheckedlists: any[] = [];
  Object.keys(jsonObject).map((value: string) => {
    if (typeof jsonObject[value] === 'object') {
      listOfCheckedlists.push({
        value: getValue(value, prefix),
        label: getLabel(value),
        children: convertJSONtoCheckboxNodes(
          jsonObject[value],
          getValue(value, prefix)
        ),
      });
    } else {
      listOfCheckedlists.push({
        value: getValue(value, prefix),
        label: getLabel(value),
      });
    }
    // eslint-disable-next-line no-console
    console.log(getValue(value, prefix), getLabel(value));
    return 0;
  });
  return listOfCheckedlists;
}
