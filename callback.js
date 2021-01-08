function myTest(age, fn) {
  let status = 'false'
  setTimeout(() => {
    status = 'true'
    status === 'true' && fn()
  }, 1000);
}

myTest(10, () => console.log('ok'))