function syntheticSub(divisor, coefs) {
  let remainder = 0;
  let newcoefs = []
  for (let cof of coefs) {
    remainder *= divisor;
    remainder += cof;
    newcoefs.push(remainder)
    // console.log(cof, remainder)
  }
  // console.log(newcoefs)
  return newcoefs
}

// console.log(syntheticSub(-2,1,5,6))

const possibleRationalZeros = (coefs) => {
  //find p
  const constant = coefs[coefs.length-1]
  let p = [];
  for (let int = 1; int <= Math.abs(constant); int++) {
    if (constant % int === 0) {
      p.push(int)
    }
  }
  // console.log('p:', p)
  // find q
  const leading = coefs[0]
  let q = []
  for (let int = 1; int <= leading; int++) {
    if (leading % int === 0) {
      q.push(int)
    }
  }
  // console.log('q:', q)
  // find p/q
  pq = [];
  for (let dividend of p) {
    for (let divisor of q) {
      if (!pq.includes(dividend/divisor)){
      pq.push(dividend/divisor)
      pq.push(0-dividend/divisor)
      }
    }
  }
  return pq
}

function findRationalZeros(coefs, factors = []) {
  const pq = possibleRationalZeros(coefs)
  let currentcoefs = coefs;
  for (let i = 0; i < pq.length; ) {
    let test = syntheticSub(pq[i], currentcoefs);
    // if item in pq is a factor, test it again against new coefs
    if (test[test.length - 1] === 0) {
      currentcoefs = test.slice(0, -1)
      factors.push(pq[i])
    }
    // if item in pq is not a factor, move to the next item
    else {
      i++
    }
  }  
  return factors 
}


function createString(coefs) {
  const an = coefs[0]
  const rationalZeros = findRationalZeros(coefs)
  let finalstring = ""
  let newcoefs = coefs
  for (let f of rationalZeros) {
    if (f > 0) {
      finalstring += `(x - ${f})`
    } else {
      finalstring += `(x + ${Math.abs(f)})`
    }
    newcoefs = syntheticSub(f, newcoefs.slice(0,-1))
  }
  if (newcoefs.length > 2) {
    let unfactored = "("
    for (i in newcoefs.slice(0, -1)) {
      if (Math.abs(newcoefs[i]) > 0) {
        unfactored += `${newcoefs[i]}x^${newcoefs.length - 1 - i} + `
      }
    }
    unfactored += newcoefs[newcoefs.length - 1] + ")"
    finalstring += unfactored
  } else {
      if (an > 1) {
      finalstring = `${an}`.concat(finalstring)
      }
  }
  finalstring = "f(x) = " + finalstring
  return finalstring
}



const submit = document.querySelector("#submit")
const output = document.querySelector(".output")
const input = document.querySelector("#coefs")
submit.addEventListener("click", () => {
  let coefs = []
  for (let item of input.value.split(",")) {
    coefs.push(Number(item))
  }
  output.textContent = createString(coefs)
})




