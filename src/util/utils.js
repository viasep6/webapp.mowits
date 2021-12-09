
/*
    takes and array and checks if comp is unique.
    example usage:
    let arr = [id:1, id:2, id:3, id:1]
    let newList = getUnique(arr, 'id')
    << returns: [id:1, id:2, id:3], thereby removing id1 as it exists twice >>
 */
export function getUnique(arr, comp) {
    // store the comparison  values in array
    const unique =  arr.map(e => e[comp])
        // store the indexes of the unique objects
        .map((e, i, final) => final.indexOf(e) === i && i)
        // eliminate the false indexes & return unique objects
        .filter((e) => arr[e]).map(e => arr[e]);
    return unique;
}

/*
 * Substitutes all whitespaces of a string the given chars
 */
export function SubstituteSpaces(str,chars) {
    return str.replace(/\s/g, chars)
}