// 数组乱序排序
export function shuffle(arr) {
  const deepList = [];

  for (let i = 0; i < arr.length; i++) {
    deepList.push(arr[i]);
  }

  for (let i = 0; i < deepList.length; i++) {
    let randomIndex = Math.floor(Math.random() * deepList.length);
    let temp = deepList[i];
    deepList[i] = deepList[randomIndex];
    deepList[randomIndex] = temp;
  }
  return deepList;
}

// 获取微信用户信息
export function getUserInfo(successFn, failFn, desc = "用于完善会员资料") {
  if (uni.getUserProfile) {
    uni.getUserProfile({
      desc,
      success: (res) => {
        successFn && successFn(res);
      },
      fail: (err) => {
        failFn && failFn(err);
      },
    });
  } else {
    uni.getUserInfo({
      success: (res) => {
        successFn && successFn(res);
      },
      fail: (err) => {
        failFn && failFn(err);
      },
    });
  }
}

// 格式化金额
export function fmtMoney(val) {
  if (!val) return "0";
  //金额转换 分->元 保留2位小数 并每隔3位用逗号分开 1,234.56
  var str = (Math.floor(val * 100) / 100).toFixed(2) + "";
  var intSum = str
    .substring(0, str.indexOf("."))
    .replace(/\B(?=(?:\d{3})+$)/g, ","); //取到整数部分
  var dot = str.substring(str.length, str.indexOf(".")); //取到小数部分搜索

  if (dot == ".00") dot = "";

  var ret = intSum + dot;
  return ret;
}

// 一维数组转成二维数组
export function listToMatrix(objArray, n = 4) {
  let len = objArray.length;
  let lineNum = len % 4 === 0 ? len / 4 : Math.floor(len / 4 + 1);
  let res = [];
  for (let i = 0; i < lineNum; i++) {
    let temp = objArray.slice(i * n, i * n + n);
    res.push(JSON.parse(JSON.stringify(temp)));
  }
  return res;
}

// 格式化手机号码
export function fmtPhone(str, format = `$1 $2 $3`) {
  if (!str) return "";
  return str.replace(/^(.{3})(.*)(.{4})$/, format);
}

export function byteLength(str = "") {
  let b = 0;
  const iLen = str.length; //初始化字节数递加变量并获取字符串参数的字符个数
  if (iLen) {
    //如果存在字符串，则执行计划
    for (let i = 0; i < iLen; i++) {
      //遍历字符串，枚举每个字符
      if (str.charCodeAt(i) > 255) {
        //字符编码大于255，说明是双字节字符
        b += 2; //则累加2个
      } else {
        b++; //否则递加一次
      }
    }
    return b; //返回字节数
  } else {
    return 0; //如果参数为空，则返回0个
  }
}

export function splitStr(str, length) {
  let arr = [];

  let index = 0;
  while (index < str.length) {
    arr.push(str.slice(index, index += length));
  }
  return arr
}

