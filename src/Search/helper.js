export const sanitizeResult = list => {
  const result =  list.map(ele => {
    ele["label"] = ele.title;
    return ele;
  })
  return result;
}
