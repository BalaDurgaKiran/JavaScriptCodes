function formatArray(array) {
    let newArray = [];
  
    for (let index = 0; index < array.length; index++) {
      if (Array.isArray(array[index])) {
        newArray = [...newArray, ...formatArray(array[index])];
      } else if (typeof array[index] === "object" && array[index] !== null) {
        newArray.push(formatObject(array[index]));
      } else {
        newArray.push(array[index]);
      }
    }
  
    return newArray;
  }
  
  function formatObject(value) {
    let newObj = {};
    const keys = value ? Object.keys(value) : [];
  
    for (const key of keys) {
      if (!Array.isArray(value[key]) && value[key] !== null && typeof value[key] === "object") {
        let returnIterator = formatObject(value[key]);
        newObj = { ...newObj, ...returnIterator };
      } else {
        if (Array.isArray(value[key])) {
          newObj[key] = formatArray(value[key]);
        } else {
          newObj[key] = value[key];
        }
      }
    }
  
    return newObj;
  }
  
  function flatten(value) {
    if (Array.isArray(value)) return formatArray(value);
    if (value !== null && typeof value === "object") return formatObject(value);
    return value;
  }
  exports.flatten = flatten;