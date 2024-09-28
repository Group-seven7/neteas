import request from "@/api/request";
import to from "await-to-js";

export const getDate = async () => {
  const [err, res] = await to(request.get("/homepage/block/page"));
  if (err) {
    console.log("请求出错");
  }
  return res;
};

export const getSong = (id) => {
  return request.get("/playlist/track/all", {
    params: {
      id: id,
      limit: 50,
      offset: 1,
    },
  });
};
