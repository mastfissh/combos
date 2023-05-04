function linkTitle(name) {
   return gridjs.html(
      `
         <a href="${name}.html">${name}</a>
      `
    )
}
function linkrisk(name, risk) {
   return gridjs.html(
      `
         <a href="${name}.html">${risk}</a>
      `
    )
}

// {
//               'data-cell-content': 'test',
//               'onclick': () => alert(cell),
//               'style': 'cursor: pointer; background-color: green;',
//             }
function thunked_attributes(data) {
  return function attributes(cell) {
    // add these attributes to the td elements only
    if (cell) {

      return getCell(cell, data)
    }
  }
}


function getCell(cell, data){
  console.debug(data)
  if (cell.includes('-')){
    for (let danger of data["danger"]){
      danger.sort()
      let str = danger.join('-')
      if (cell == str){
        return {
          'style': 'cursor: pointer; background-color: red',
        };
      }
    }
    for (let safe of data["safe"]){
      safe.sort()
      let str = safe.join('-')
      if (cell == str){
        return {
          'style': 'cursor: pointer; background-color: green',
        };
      }
    }
    return {
      'style': 'cursor: pointer; background-color: grey',
    };
  } else {
    return {
      'style': 'cursor: pointer; background-color: white',
    };
  }
}

function col(base, data) {
  return {
        name: base,
        attributes: thunked_attributes(data)
      }
}
let count = -1
function nextCell(substances) {
  count = count + 1
  if (count == 0){
    return ""
  }
  if (count <= substances.length){
    return substances[count-1]
  }
  let row = count % (substances.length + 1)
  let col = Math.floor(count / (substances.length + 1))
  if (row == 0){
    let pos = count / (substances.length + 1)
    return substances[pos - 1]
  }
  let subs = []
  subs.push(substances[row-1])
  subs.push(substances[col-1])
  subs = [...new Set(subs)]
  subs.sort()
  // if (row == col){
  //   return "same"
  // }

  return subs.join('-')
  }

let substances
async function main() {
  let url = 'https://mastfissh.github.io/combos/data.json';

  let data = await fetch(url)
  .then(res => res.json())


  substances = data["substances"]
  let cols = [col("base")]
  for (let substance of substances){
    cols.push(col(substance, data))
  }
  let table = []
  for(var i = 0; i <= substances.length; i++){
    let row = []
    for(var j = 0; j <= substances.length; j++){
        row.push(nextCell(substances))
    }
    table.push(row)
  }

  new gridjs.Grid({
    columns: cols,
    data: table

  }).render(document.getElementById("wrapper"));
}
main()
