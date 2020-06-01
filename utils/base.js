const URI = 'http://vps.521plus.com';

const wxRequest = (url, opt) => {
  return new Promise((res, rej) => {
    wx.request({
      url: url,
      method: opt.method,
      data: Object.assign({}, opt.data),
      header: opt.header,
      success: res,
      fail: rej
    })
  });
}

const request = async (url, opt) => {
  let options = Object.assign({ data: {} }, opt);

  if (/^\/api\/(.+)$/.test(url)) {
    url = URI + url;
  }

  console.log('url', url)
  if(!options.method) {
    options.method = 'GET';
  }
  let header = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
  options.header = options.header || header;

  if(options.method == 'POST') {
    for (let key in options.data) {
      options.data[key] = encodeURIComponent(options.data[key])
    }
  }

  try {  
    const res = await wxRequest(url, options)
    if (res && res.statusCode) {
      if (res.statusCode != 200) {
        wx.showModal({
            content: '请求失败，请重新尝试',
            title: '提示',
            showCancel: false
        })
      } else {
        if (res.data) {
          if (res.data.code == 0) {
            return res.data
          }
          else {
            wx.showModal({
              title: '提示',
              content: res.data.msg || '请求失败!',
              showCancel: false
            })
            return res.data
          }
        }
        else {
          wx.showModal({
            title: '提示',
            content: '请求失败!!',
            showCancel: false
          })
        }
      }
    }
  } catch (error) {
    console.dir( error,'error')
    wx.showModal({
        content: '网络异常',
        title: '',
        showCancel: false
    })
  }
}

module.exports = { request };
