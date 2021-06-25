/**
 * @Author: 水痕
 * @Date: 2021-06-12 09:00:52
 * @LastEditors: 水痕
 * @Description: 定义随机生成数字的方法
 * @param {*}
 * @return {*}
 */
export const getRandomNum = (len = 4): string => {
  let str = '';
  for (let i = 0; i < len; i++) {
    str += Math.floor(Math.random() * 10);
  }
  return str;
};
