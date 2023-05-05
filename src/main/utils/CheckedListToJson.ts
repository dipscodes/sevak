function splitInHalf(string: string, separator: string) {
  const parts = [
    string.slice(0, string.indexOf(separator)),
    string.slice(string.indexOf(separator) + 1),
  ];
  return parts;
}

function modifyRecursively(chk: string, obj: object): object {
  if (chk.split('~').length === 1) {
    obj[chk] = true;
  } else {
    const key = splitInHalf(chk, '~')[0];
    const value = modifyRecursively(splitInHalf(chk, '~')[1], obj[key]);
    obj[key] = value;
  }

  return obj;
}

export default function checkedListToJson(
  checkedList: string[],
  permissionObject: object
): object {
  if (!checkedList) {
    return permissionObject;
  }
  let updatedPermissionObject = permissionObject;
  checkedList.forEach((value) => {
    updatedPermissionObject = modifyRecursively(value, updatedPermissionObject);
  });

  console.log('checkedListToJSON');
  return updatedPermissionObject;
}
