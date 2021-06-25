/**
 * @Author: 水痕
 * @Date: 2021-06-12 12:24:27
 * @LastEditors: 水痕
 * @Description: 将map转换为对象
 * @param {*}
 * @return {*}
 */
export const mapToObj = (map: Map<string, any>): Partial<{ [key: string]: unknown }> => {
  const obj: Partial<{ [key: string]: unknown }> = {};
  for (const [k, v] of map) {
    obj[k] = v;
  }
  return obj;
};
