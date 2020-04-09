export const transformEnumsToArray = (enmus) => {
  const tempArr = [];
  for (const key in enmus) {
    if (enmus.hasOwnProperty(key)) {
      let element = enmus[key];
      tempArr.push({
        value: element.ENUM,
        label: element.LABEL
      });
    }
  }
  
  return tempArr;
}

export const generateEnums = (enums) => {
  let tempObj = {};
  for (const key in enums) {
    if (enums.hasOwnProperty(key)) {
      const el = enums[key];
      tempObj[tempObj[el.LABEL] = el.ENUM] = el.LABEL;
    }
  }
  return tempObj;
}