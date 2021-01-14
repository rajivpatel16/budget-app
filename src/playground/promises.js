const promise = new Promise((resolve, reject)=> {
   
    // setTimeout(() => {
    //     resolve('this is my resolve data');
    // }, 1500)
    reject('Something went wrong');
})
console.log('before')
promise.then((data) => {
    console.log(data)
}).catch((error) => {
    console.log(error)
})

console.log('after')