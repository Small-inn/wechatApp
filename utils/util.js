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

// 请求数据接口
const http = (url, callback) => {
  wx.request({
    url: url,
    data: {},
    method: 'GET',
    // header: {},
    success: function (res) {
      callback(res.data)
    },
    fail: function (err) {
      console.log(err)
    },
  })
}

const convertToStarsArray = (stars) => {
  var num = stars.toString().substring(0, 1);
  var array = [];
  for (var i = 1; i <= 5; i++) {
    if (i <= num) {
      array.push(1);
    } else {
      array.push(0);
    }
  }
  return array;
}

const convertToCastString = (casts) => {
  var castsjoin = "";
  for (var idx in casts) {
    castsjoin = castsjoin + casts[idx].name + " / ";
  }
  return castsjoin.substring(0, castsjoin.length - 2);
}

const convertToCastInfos = (casts) => {
  var castsArray = []
  for (var idx in casts) {
    var cast = {
      img: casts[idx].avatars ? casts[idx].avatars.large : "",
      name: casts[idx].name
    }
    castsArray.push(cast);
  }
  return castsArray;
}

module.exports = {
  formatTime,
  convertToArray,
  http,
  convertToStarsArray,
  convertToCastString,
  convertToCastInfos
}