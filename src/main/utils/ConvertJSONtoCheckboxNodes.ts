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
): Array<object> {
  const listOfCheckedlists: object[] = [];
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
    } else if (jsonObject[value] !== 'null') {
      listOfCheckedlists.push({
        value: getValue(value, prefix),
        label: getLabel(value),
      });
    }
    return 0;
  });
  return listOfCheckedlists;
}
