const URI = 'https://vps.521plus.com/';

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

  // console.log('url', url)
  let sessionKey = wx.getStorageSync('sessionInfo');
  
  console.log('sessionKey', sessionKey);

  if (sessionKey) {
    options.data['sessionInfo'] = sessionKey;
  }

  if(!options.method) {
    options.method = 'POST';
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

const login = async e => {
  console.log('from login', e);
  wx.login({
    async success (res) {
      if (res.code) {
        //发起网络请求
        const result = await request('/api/map/MapBase/wxlogin', {
          method: 'POST',
          data: {
            code: res.code,
            encryoteData: e.detail.encryptedData,
            iv: e.detail.iv,
            rawData: e.detail.rawData
          }
        });

        console.log(result);

        if(result.code == 0) {
          wx.setStorageSync('userInfo', e.detail.userInfo);
          wx.setStorageSync('sessionInfo', result.data.sessionInfo);
        }

        console.log('res', result);
      } else {
        console.log('登录失败！' + res.errMsg)
      }
    }
  })
}

const chooseLocation = () => {
  return new Promise((res, rej) => {
    wx.authorize({
      scope: "scope.userLocation",
      success: () => {
        wx.chooseLocation({
          success (result) {
            res(result);
          },
          fail (err) {
            rej(err);
          }
        })
      },
      fail: e => {
        wx.showModal({
          title: '提示',
          content: '需开启位置授权才能选择地点',
          showCancel: false
        })
  
      }
    })

  })
}

module.exports = { request, login, chooseLocation };
