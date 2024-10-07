import request from "@/api/request";
import { data } from "autoprefixer";
import to from "await-to-js";

// 搜索
/* 
说明 : 调用此接口 , 传入搜索关键词可以搜索该音乐 / 专辑 / 歌手 / 歌单 / 用户 , 关键词可以多个 , 以空格隔开 , 如 " 周杰伦 搁浅 "( 不需要登录 ), 可通过 /song/url 接口传入歌曲 id 获取具体的播放链接
必选参数 : keywords : 关键词
可选参数 : limit : 返回数量 , 默认为 30 offset : 偏移数量，用于分页 , 如 : 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
type: 搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合, 2000:声音(搜索声音返回字段格式会不一样)
接口地址 : /search 或者 /cloudsearch(更全)
调用例子 : /search?keywords=海阔天空 /cloudsearch?keywords=海阔天空
*/
export const cloudsearch = async (data) => {
  const [error, res] = await to(request.post("/cloudsearch"), data);
  if (error) return console.log("请求出错！");
  return res.data;
};
// 首页数据 Homepage
export const getDate = async () => {
  const [err, res] = await to(request.get("/homepage/block/page"));
  if (err) {
    console.log("请求出错");
  }
  return res;
};
// 获取歌单所有歌曲
/* 
说明 : 由于网易云接口限制，歌单详情只会提供 10 首歌，通过调用此接口，传入对应的歌单id，即可获得对应的所有歌曲
必选参数 : id : 歌单 id
可选参数 : limit : 限制获取歌曲的数量，默认值为当前歌单的歌曲数量
可选参数 : offset : 默认值为0
接口地址 : /playlist/track/all
调用例子 : /playlist/track/all?id=24381616&limit=10&offset=1
注：关于offset，你可以这样理解，假设你当前的歌单有200首歌
你传入limit=50&offset=0等价于limit=50，你会得到第1-50首歌曲
你传入limit=50&offset=50，你会得到第51-100首歌曲
如果你设置limit=50&offset=100，你就会得到第101-150首歌曲
*/
// export const getNewSong = async (data) => {
//   const [error, res] = await to(request.post("/playlist/track/all"), data);
//   if (error) return console.log("请求出错！");
//   return res.data;
// };
export const getNewSong = (id) => {
  return request.get("/playlist/track/all", {
    params: {
      id: id,
      limit: 50,
      offset: 1,
    },
  });
};
// 获取歌单详情
/* 
说明 : 歌单能看到歌单名字, 但看不到具体歌单内容 , 调用此接口 , 传入歌单 id, 可 以获取对应歌单内的所有的音乐(未登录状态只能获取不完整的歌单,登录后是完整的)，
但是返回的 trackIds 是完整的，tracks 则是不完整的，可拿全部 trackIds 请求一次 song/detail 
接口获取所有歌曲的详情 (https://github.com/Binaryify/NeteaseCloudMusicApi/issues/452)
必选参数 : id : 歌单 id
可选参数 : s : 歌单最近的 s 个收藏者,默认为 8
接口地址 : /playlist/detail
调用例子 : /playlist/detail?id=24381616
*/
export const getSongDetail = (id) => {
  return request.get("/playlist/detail", {
    params: {
      id: id,
    },
  });
};
// export const getSongDetail = async (data) => {
//   const [error, res] = await to(request.post("/playlist/detail"), data);
//   if (error) return console.log("请求出错！");
//   return res.data;
// };
// 默认搜索关键词
/* 
说明 : 调用此接口 , 可获取默认搜索关键词
接口地址 : /search/default
*/
export const cloudsearchDefault = async (data) => {
  const [error, res] = await to(request.get("/search/default"), data);
  if (error) return console.log("请求出错！");
  return res.data;
};
// 手机登录
/**
必选参数
phone: 手机号码
password: 密码
调用例子: /login/cellphone ? phone = xxx & password=yyy / login / cellphone ? phone = xxx & md5_password=yyy / login / cellphone ? phone = xxx & captcha=1234
*/
export const verify = (phone, password) => {
  return request.get("/login/cellphone", {
    params: {
      phone,
      password,
    },
  });
};
// 发送验证码
/**
必选参数 : phone: 手机号码
可选参数 : ctcode: 国家区号,默认 86 即中国
接口地址 : /captcha/sent
调用例子 : /captcha/sent?phone=13xxx
 */
// 验证手机号码的正则表达式
const isValidPhone = (phone) => /^1[3-9]\d{9}$/.test(phone);

export const sendValidateCode = async (phone, ctcode = 86) => {
  // 检查手机号的有效性
  if (!isValidPhone(phone)) {
    throw new Error(
      "Invalid phone number format. It must be an 11-digit mobile number starting with '1'."
    );
  }

  try {
    console.log(
      `Sending request to /captcha/sent with phone: ${phone}, ctcode: ${ctcode}`
    );

    const response = await request.post("/captcha/sent", null, {
      params: {
        phone,
        ctcode,
      },
    });

    console.log("Response data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error occurred:", error);

    if (error.response) {
      console.error("Server responded with status:", error.response.status);
      console.error("Server error data:", error.response.data);
      throw new Error(
        `Server Error: ${error.response.data.message || "An error occurred"}`
      );
    } else {
      console.error("Error:", error.message);
      throw new Error("Network Error: Please try again later.");
    }
  }
};

// 验证验证码
/* 
必选参数 : 
      phone: 手机号码
      captcha: 验证码
可选参数 :
      ctcode: 国家区号,默认 86 即中国
接口地址 : /captcha/verify
调用例子 : /captcha/verify?phone=13xxx&captcha=1597
*/
export const verifyCaptcha = async (data) => {
  const [error, res] = await to(request.post("/captcha/verify"), data);
  if (error) return console.log("请求出错！");
  return res.data;
};

// 邮箱登录
/* 
必选参数 :
    email: 163 网易邮箱
    password: 密码
可选参数 :
    md5_password: md5 加密后的密码,传入后 password 将失效
接口地址 : /login
调用例子 : /login?email=xxx@163.com&password=yyy
*/
export const loginByEmail = async (data) => {
  const [error, res] = await to(request.post("/login"), data);
  if (error) return console.log("请求出错！");
  return res.data;
};

// 二维码登录
// 1. 二维码 key 生成接口
/* 
说明: 调用此接口可生成一个 key
接口地址 : /login/qr/key
*/
// 二维码登录接口
// export const getQRCodeKey = async () => {
//   const [error, res] = await to(request.get("/login/qr/key"));
//   if (error) {
//     console.error("请求出错！", error);
//     return null;
//   }
//   return res.data;
// };

export const getQRCoderKey = async () => {
  try {
    const response = await request.get("/login/qr/key", {
      params: { timestamp: Date.now() }, // 添加时间戳
    });
    return response.data;
  } catch (error) {
    throw new Error(`获取二维码key失败: ${error.message}`);
  }
};

// 2. 二维码生成接口
/* 
必选参数: key,由第一个接口生成
可选参数: qrimg 传入后会额外返回二维码图片 base64 编码
接口地址 : /login/qr/create
调用例子 : /login/qr/create?key=xxx
*/
// export const createQRCodeIMG = async (key, qrimg = true) => {
//   const [error, res] = await to(
//     request.get("/login/qr/create", {
//       params: {
//         key,
//         qrimg, // qrimg 默认为 true，意味着会返回二维码图片 base64 编码
//       },
//     })
//   );

//   if (error) {
//     console.error("请求出错！", error);
//     return null; // 或者根据需求处理错误
//   }

//   return res.data; // 返回响应数据
// };

// 创建二维码
export const createQR = async (key) => {
  try {
    const response = await request.get("/login/qr/create", {
      params: {
        key,
        qrimg: true, // 可选参数，要求返回 base64 图像
        timestamp: Date.now(), // 添加时间戳
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(`创建二维码失败: ${error.message}`);
  }
};

// 检查二维码状态
export const checkQRStatus = async (key, noCookie = false) => {
  try {
    const response = await request.get("/login/qr/check", {
      params: {
        key,
        noCookie,
        timestamp: Date.now(), // 添加时间戳
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(`检查二维码状态失败: ${error.message}`);
  }
};

// 游客登录
/* 
接口地址 : /register/anonimous
*/
export const loginByTourist = async (data) => {
  const [error, res] = await to(request.post("/register/anonimous"), data);
  if (error) return console.log("请求出错！");
  return res.data;
};

// 刷新登录状态
/* 
说明 : 调用此接口 , 可刷新登录状态,返回内容包含新的cookie(不支持刷新二维码登录的cookie)
调用例子 : /login/refresh
*/
export const refreshLoginStatus = async (data) => {
  const [error, res] = await to(request.post("/login/refresh"), data);
  if (error) return console.log("请求出错！");
  return res.data;
};
// 获取用户详情
// 说明 : 登录后调用此接口 , 传入用户 id, 可以获取用户详情

// 必选参数 : uid : 用户 id

// 接口地址 : /user/detail

// 调用例子 : /user/detail?uid=32953014

// 获取账号信息
// 说明 : 登录后调用此接口 ,可获取用户账号信息

// 接口地址 : /user/account

// 调用例子 : /user/account

// export const GetScanKey = async (time) => {
//   return axios.get("http://localhost:3000/login/qr/key", {
//     params: {
//       timestamp: time,
//     },
//   });
// };
// 将key作为参数，获取二维码base64
// export const Scan = (key, time) => {
//   return axios.get("http://localhost:3000/login/qr/create", {
//     params: {
//       qrimg: true,
//       key,
//     },
//   });
// };
// 获取二维码状态
// export const QrCodeStatus = (key, time) => {
//   return axios.get("http://localhost:3000/login/qr/check", {
//     params: {
//       key,
//       timestamp: time,
//     },
//   });
// };
// 验证账号密码
