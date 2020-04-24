const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const convertToArray = stars => {
  let num = Math.floor(stars / 10 * 2 / 2)
  let arr = []
  for (let i = 0; i < 5; i++) {
    if (i < num) {
      arr.push(1)
    } else {
      arr.push(0)
    }
  }
  return arr
}

module.exports = {
  formatTime: formatTime,
  convertToArray
}