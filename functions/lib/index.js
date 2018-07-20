const {createRows , tableLog} = require('./richResponses')

const jedi = {
  name: 'Obi-Wan Kenobi',
  lightsaber: 'blue',
  age: 57
}



console.log(tableLog(jedi))