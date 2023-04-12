export default function convertJSONtoCheckboxNodes(jsonObject: object) {
  const listOfCheckedlists: any[] = [];
  Object.keys(jsonObject).map((value: string) => {
    if (typeof jsonObject[value] === 'object') {
      listOfCheckedlists.push({
        value,
        label: value,
        children: convertJSONtoCheckboxNodes(jsonObject[value]),
      });
    } else {
      listOfCheckedlists.push({
        value,
        label: value,
      });
    }
    return 0;
  });
  return listOfCheckedlists;
}
