// console.log('json.stringify()')
// console.log(JSON.stringify({}))
// console.log(JSON.stringify(true))
// console.log(JSON.stringify("foo"))
// console.log(JSON.stringify([1, 2, 3]))
// console.log(JSON.stringify({ x: 5 }))
//
// console.log('orgin data')
// console.log({})
// console.log(true)
// console.log("foo")
// console.log([1, 2, 3])
// console.log({ x: 5 })

// function replacer(key, value) {
//   if (typeof value === "string") {
//     return undefined
//   }
//   return value
// }
//
// var foo = {foundation: "Mozilla", model: "box", week: 45, transport: "car", month: 7}
// var jsonString = JSON.stringify(foo, replacer)
// console.log(jsonString)

var json = '{"result":true, "count":42}'
obj = JSON.parse(json)

console.log(obj.count)
// expected output: 42

console.log(obj.result)
// expected output: true
