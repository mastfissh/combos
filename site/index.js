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

function style(cell, row, column){
  // console.debug(column)
  if (cell) {
    return {
      'data-cell-content': cell,
      'onclick': () => alert(cell),
      'style': 'cursor: pointer; background-color: green;',
    };
  }
}


async function main() {
  let url = 'data.json';

  let data = await fetch(url)
  .then(res => res.json())
  console.debug(data)
  new gridjs.Grid({
    columns:[
    {
          'attributes': style
    },
      {
          'attributes': style
    },
      {
          'attributes': style
    },
      {
          'attributes': style
    },
        ],
    data: [
      ["", linkTitle("milk"), linkTitle("cereal"),linkTitle("salt")],
      [linkTitle("milk"), linkTitle("milk"), linkrisk("cereal-milk", "safe"), linkrisk("salt-milk", "safe")],
      [linkTitle("cereal"), linkrisk("cereal-milk", "safe"), linkTitle("cereal"),linkrisk("cereal-salt", "safe")],
      [linkTitle("salt"), linkrisk("salt-milk", "safe"), linkrisk("cereal-salt", "safe"), linkTitle("salt")],
    ]

  }).render(document.getElementById("wrapper"));
}
main()
