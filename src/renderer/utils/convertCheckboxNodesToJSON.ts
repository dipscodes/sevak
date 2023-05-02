interface CheckBoxWithoutChildren {
  value: string;
  label: string;
  children?: any;
}

interface CheckBoxWithChildren {
  value: string;
  label: string;
  children: Array<CheckBoxWithChildren | CheckBoxWithoutChildren>;
}

export default function convertCheckboxNodesToJSON(
  checkBox: (CheckBoxWithChildren | CheckBoxWithoutChildren)[],
  depth: number
): object {
  const listOfCheckedlists: object = {};
  checkBox.map((value: CheckBoxWithChildren | CheckBoxWithoutChildren) => {
    const key = value.value.split('~')[depth];
    if (Object.prototype.hasOwnProperty.call(value, 'children')) {
      listOfCheckedlists[key] = convertCheckboxNodesToJSON(
        value.children,
        depth + 1
      );
    } else {
      listOfCheckedlists[key] = false;
    }
    // eslint-disable-next-line no-console
    // console.log(getValue(value, prefix), getLabel(value));
    return 0;
  });
  return listOfCheckedlists;
}
