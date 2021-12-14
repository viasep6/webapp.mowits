import * as utils from './utils'


test('util.test.isUniqueResult', () => {
    // arrange
    let expected = [{ id:1, text: "test"}, { id:2, text: "test"}, { id:3, text: "test"}]
    let arr = [{ id:1, text: "test"}, { id:2, text: "test"}, { id:3, text: "test"}, { id:1, text: "test"}]
    // act
    let unique = utils.getUnique(arr, "id")
    // assert
    expect(unique).toEqual(expected)
})