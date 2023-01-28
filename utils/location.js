function init(QQMapWX) {
  return new QQMapWX({
    key: "", // 必填
  });
}

// * 地址解析
export function getPosition8Address(address, QQMapWX) {
  const qqmapsdk = init(QQMapWX);
  const addressFmt = address.replace(/\s+/g, "");

  return new Promise((resolve, reject) => {
    qqmapsdk.geocoder({
      address,
      success: (res) => {
        const { result, status } = res;
        if (status == 0) {
          resolve({
            result,
            sdk: qqmapsdk,
          });
        } else {
          reject(res);
        }
      },
      fail: (err) => {
        reject(err);
      },
    });
  });
}
