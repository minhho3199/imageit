//This code is from the react-reactions package by caseandberg on github.com
//See https://github.com/casesandberg/react-reactions
export function listOfNames(names) {
  return [names.slice(0, -1).join(', '), names.slice(-1)[0]].join(names.length < 2 ? '' : ' and ')
}
