import http from "@/utils/http";

export function doUpload(params) {
  const otherCfg = {};
  if (params.fileType == "video") {
    otherCfg.timeout = 1000 * 60 * 5;
  }

  return new Promise((resolve, reject) => {
    http
      .upload("possession/v1/file/upload", {
        name: "file",
        fileType: "image",
        ...otherCfg,
        ...params,
        useToken: true,
      })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

// * 获取素材封面列表
export async function doGetCoverList() {
  return await http.get("possession/v1/wealth/cover/list", {
    useToken: true,
  });
}
