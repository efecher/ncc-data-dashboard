// NOTE: utils.js: library of helper functions to perform various small tasks
//                 migrated out of components to reduce clutter and code size
/***************************************************************************/


// NOTE: will inspect string data from inputs, determine if it is a floating-point number or integer, return the integer or float for storage. This is used for converting the string input from inputs to numeric data in storage.
// TODO: need to add column data, specifically the "float" to determine which columns are floating point (GPA) or integer for conversion.
export function stringToNumeric(data) {
  let isFloat = parseFloat(data);
  if (isNaN(isFloat)) {
    // NOTE: assume not a float, try integer
    let isInteger = parseInt(data);
    if (isNaN(isInteger)) {
      // NOTE: data is not an integer either
      console.error("Input conversion error: not numeric");
      return data;
    } else {
      return isInteger;
    }
  } else {
    return isFloat;
  }
}