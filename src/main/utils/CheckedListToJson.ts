export default function checkedListToJson(
  checkedList: string[],
  permissionObject: object,
  rawTokenKey: string
): object {
  // const permissionObject = template;
  if (!checkedList) {
    return permissionObject;
  }
  checkedList.forEach((value) => {
    const key = value.split('-')[0];
    const subKey = value.split('-')[1];
    let temp: any;
    value.split('~').map((v) => {
      temp = permissionObject[v];
      return temp;
    });
    permissionObject[key][subKey] = true;
  });
  Object.assign(permissionObject, { token: rawTokenKey });
  // permissionObject.token = rawTokenKey;

  return permissionObject;
}
