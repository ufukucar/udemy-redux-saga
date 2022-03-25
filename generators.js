// 100 + 200 + 300

const doWork = function* (a, b, c) {
  console.log('doWork invoked')
  let sum = 0
  sum += a
  yield sum // return & pause

  sum += b // 100 + 200
  yield sum // return & pause

  sum += c // 300 + 300
  yield sum // return & pause

  return 'Work is done'
}

let work = doWork(100, 200, 300) // Object [Generator] {}

console.log(work) // Object [Generator] {}

console.log(work.next()) // { value: 100, done: false }

console.log(work.next()) // { value: 300, done: false }
console.log(work.next()) // { value: 600, done: false }
console.log(work.next()) // { value: undefined, done: true }
