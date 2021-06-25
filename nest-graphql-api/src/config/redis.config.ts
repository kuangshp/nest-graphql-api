export default {
  /**尝试登录10次被锁住 */
  loginLockCount: 10,
  /**锁住30分钟 */
  loginLockTime: 30 * 60,
  /** redis中的key前缀 */
  loginLockPrefix: 'login_lock',
};
