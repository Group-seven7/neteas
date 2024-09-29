import request from "@/api/request";
import to from "await-to-js";

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
