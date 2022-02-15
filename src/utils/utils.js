// NOTE: utils.js: library of helper functions to perform various small tasks
//                 migrated out of components to reduce clutter and code size
/***************************************************************************/

export function trimEmptyRows(data) {
  let trimmedData = [];
  
  for(let r=0; r<data.length; r++) {
    //console.log(data[r]);
    // NOTE: scan columns in this row for empty inputs
    //console.log(data[r]);
    let rowKeys = Object.keys(data[r]);
    
    let columnCount = 0;
    // NOTE: scan row, count blank columns in row
    for(let c=0; c<rowKeys.length; c++) {
      //console.log(data[r][`${rowKeys[c]}`]);
      if(data[r][`${rowKeys[c]}`] === "") {
        columnCount++;
      }
    }
    // NOTE: if entire row is left blank, assume it was added in error and truncate it
    if(columnCount === rowKeys.length) {
      continue; // NOTE: don't do anything with this row and go to the next iteration
    } else {
      // NOTE: the row has valid data, push it to the output of trimmed data
      trimmedData.push(data[r]);
    }
  }
  return trimmedData;
}