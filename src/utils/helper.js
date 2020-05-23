import { data } from './data';

export const createFrequency = (list) => {
  let dictionary = {}
  //Create dictionary of all the words present in the document
  list.forEach((ele, documentIndex) => {
    const str = ele.summary.split(' ');
    str.forEach(element => {
      const sanitizedString = sanitizeString(element.toLowerCase())
      if(dictionary[sanitizedString]) {
        if(dictionary[sanitizedString][documentIndex]) {
          dictionary[sanitizedString][documentIndex]++;
        } else {
          dictionary[sanitizedString][documentIndex] = 1;
        }
      } else {
        dictionary[sanitizedString] = { [documentIndex]: 1};
      }
    })
  })
  return dictionary;
}

export const sanitizeString = (str) => {
  str = str.replace(/[^a-z]/gim,"");
  return str.trim();
}

export const searchTerm = (text, number) => {
  const textArray = text.split(' ');
  const dictionary = createFrequency(data.summaries);
  let resultObject = [];
  let keysArray = []
  const result = []
  for(let i = 0; i< textArray.length; i++) {
    if(dictionary[textArray[i]]) {
      result.push(dictionary[textArray[i].toLowerCase()])
    }
  }
  if(result.length < 1) {
    return []
  }
  result.forEach((ele) => {
    keysArray.push(Object.keys(ele));
  })

  const sortedResults = getSortedResult(result)
  const commonDocuments = sortedResults.filter((v, i, a) => a.indexOf(v) !== i); 
  const uniqueArr = sortedResults.filter((v, i, a) => a.indexOf(v) === i); 
  const arr = commonDocuments.concat(uniqueArr);
  const resultSet = new Set(arr);
  const resultArr = Array.from(resultSet);
  resultObject = resultArr.slice(0, number)
  const docuemntsList = getDocumentList(resultObject);
  return docuemntsList;
}

export const getDocumentList = (documentIds) => {
  let result = [];
  for(let i = 0; i< documentIds.length; i++) {
    result.push({
      summary: data.summaries[documentIds[i]].summary,
      author: data.authors[documentIds[i]].author,
      id: data.authors[documentIds[i]].book_id,
      title: data.titles[documentIds[i]]
    })
  }
  return result;
}

export const getSortedResult = (result) => {
  const newResult = []
  for(let i = 0; i <result.length; i++ ) {
    const keysArray = Object.keys(result[i]);
    keysArray.forEach((ele, index) => {
      newResult.push({
        key: ele,
        value: result[i][keysArray[index]]
      })
    })
  }
  const sortedResult = newResult.sort(compare)
  const sortedDocuemntIds = sortedResult.map(ele => Number(ele.key));
  return sortedDocuemntIds;
}

export const compare = (a, b) => {
  if(a.value > b.value) return -1;
  return 1;
}
