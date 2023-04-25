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
  checkBox: (CheckBoxWithChildren | CheckBoxWithoutChildren)[]
): object {
  const listOfCheckedlists: object = {};
  checkBox.map((value: CheckBoxWithChildren | CheckBoxWithoutChildren) => {
    if (Object.prototype.hasOwnProperty.call(value, 'children')) {
      listOfCheckedlists[value.label] = convertCheckboxNodesToJSON(
        value.children
      );
    } else {
      listOfCheckedlists[value.label] = false;
    }
    // eslint-disable-next-line no-console
    // console.log(getValue(value, prefix), getLabel(value));
    return 0;
  });
  return listOfCheckedlists;
}
