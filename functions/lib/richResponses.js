const { Table } = require('actions-on-google')

// Return the key and value 
const createRows = o => Object.keys(o).map(i => [i, o[i]])
// Return array of the key names
const getColumns = o => Object.keys(o)

const tableLog = o => {
  const rows = createRows(o)
  return new Table({
    title: `Log `,
    dividers: true,
    columns: ['Key', 'Value'],
    rows: rows,
  })
}


module.exports = {createRows, getColumns, tableLog}