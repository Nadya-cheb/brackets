module.exports = function check(str, bracketsConfig) {
  // your solution
  //const OpenBrackets = ['(', '{', '[', '|'];
  //const BracketsPair = {
  //   [')'] : '(',
  //   ['}'] : '{',
  //   [']'] : '[',
  //   ['|'] : '|',
  // };

  let OpenBrackets = [];
  let BracketsPair = {};

  bracketsConfig.forEach(element => {
    OpenBrackets.push(element[0]);
    BracketsPair[element[1]] = element[0];
  });

  function isOk(str) {
    let stack = [];
    for (let i = 0; i < str.length; i++) {
      let symbol = str[i];
      if (symbol !== BracketsPair[symbol]) {
        //если открывающийся символ отличается от закрывающего, например '[' !=== ']'
        if (OpenBrackets.includes(symbol)) {
          //если символ открывающийся
          stack.push(symbol);
        } else {
          //если символ закрывающийся
          if (stack.length > 0) {
            let topElem = stack[stack.length - 1];
            if (BracketsPair[symbol] === topElem) {
              stack.pop();
            } else return false;
          } else return false;
        }
      } else {
        if ([...str].filter(x => x === symbol).length % 2 > 0) {
          //если нечетное количество
          return false;
        } else {
          //если четное количество
          let indices = [];
          let idx = str.indexOf(symbol);
          while (idx != -1) {
            indices.push(idx);
            idx = str.indexOf(symbol, idx + 1);
          }
          for (let j = 0; j < indices.length; j = j + 2) {
            let subStr = str.substring(indices[j], indices[j + 1] + 1);
            if (subStr.length > 2) {
              if (!isOk(subStr.substring(1, subStr.length - 1))) return false;
            }
          }
        }
      }
    }
    return stack.length === 0;
  }
  return isOk(str);
}
