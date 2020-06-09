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

const calcTime = (time) => {
  let str = String(time).replace(/-/g,"/");

  let newSS = new Date(str);

  let month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  let res = month[newSS.getMonth()] + "." + newSS.getDate() + " " + newSS.getFullYear() + " " + getMoon(newSS.getHours());

  return res;
}

const getMoon = (hour) => {
  let res;
  if(hour >= 0 && hour < 4) {
    res = "凌晨";
  } else if(hour < 9) {
    res = "早晨";
  } else if(hour < 11) {
    res = "上午";
  } else if(hour < 15) {
    res = "中午";
  } else if(hour < 19) {
    res = "下午";
  } else {
    res = "晚上";
  }

  return res;
}

module.exports = {
  formatTime,
  calcTime
}
