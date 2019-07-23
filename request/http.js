
import axios from 'axios'


// // 接口地址切换
// if(process.env.NODE_ENV=='development'){
//   axios.defaults.baseURL='http://localhost:3000';
// }else if(process.env.NODE_ENV=='debug'){
//   axios.defaults.baseURL='http://localhost:3000';
// }else if(process.env.NODE_ENV=='production'){
//   axios.defaults.baseURL='http://localhost:3000';
// }


// 这个用途不一样，
// baseUrl会附加到你绑定的axios实例（如果是全局的，那就是所有实例）上，即如果get/post的url参数是相对路径（如） /api/c/xx，那就会执行 baseUrl + '/api/c/xx',如果未指定baseUrl，那就走浏览器地址栏里的base + baseUrl。
// webpack里的proxyTable是测试环境为了避免浏览器下的跨域访问，而以nodejs代理成同前端页面（即浏览器地址栏）同域的一种处理。指定proxyTable后， axios就不需要指定baseUrl了。proxyTable会把base + '/api/c/xx'代理到【base baseUrl + '/api/c/xx'】的接口地址上。
// 请求过期时间
axios.defaults.timeout=10000;

axios.defaults.headers.post['Content-Type']="application/x-www-form-urlencoded;charset='UTF-8'"

// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

// import store from '@/store/index';

// // 请求拦截器axios.interceptors.request.use(
//     config => {
//         // 每次发送请求之前判断vuex中是否存在token
//         // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
//         // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
//         const token = store.state.token;
//         token && (config.headers.Authorization = token);
//         return config;
//     },
//     error => {
//         return Promise.error(error);
// })

// 响应拦截器
// axios.interceptors.response.use(
//   response => {
//       // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
//       // 否则的话抛出错误
//       if (response.status === 200) {
//           return Promise.resolve(response);
//       } else {
//           return Promise.reject(response);
//       }
//   },
//   // 服务器状态码不是2开头的的情况
//   // 这里可以跟你们的后台开发人员协商好统一的错误状态码
//   // 然后根据返回的状态码进行一些操作，例如登录过期提示，错误提示等等
//   // 下面列举几个常见的操作，其他需求可自行扩展
//   error => {
//       if (error.response.status) {
//           switch (error.response.status) {
//               // 401: 未登录
//               // 未登录则跳转登录页面，并携带当前页面的路径
//               // 在登录成功后返回当前页面，这一步需要在登录页操作。
//               case 401:
//                   router.replace({
//                       path: '/login',
//                       query: {
//                           redirect: router.currentRoute.fullPath
//                       }
//                   });
//                   break;

//               // 403 token过期
//               // 登录过期对用户进行提示
//               // 清除本地token和清空vuex中token对象
//               // 跳转登录页面
//               case 403:
//                     Toast({
//                       message: '登录过期，请重新登录',
//                       duration: 1000,
//                       forbidClick: true
//                   });
//                   // 清除token
//                   localStorage.removeItem('token');
//                   store.commit('loginSuccess', null);
//                   // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
//                   setTimeout(() => {
//                       router.replace({
//                           path: '/login',
//                           query: {
//                               redirect: router.currentRoute.fullPath
//                           }
//                       });
//                   }, 1000);
//                   break;

//               // 404请求不存在
//               case 404:
//                   Toast({
//                       message: '网络请求不存在',
//                       duration: 1500,
//                       forbidClick: true
//                   });
//                   break;
//               // 其他错误，直接抛出错误提示
//               default:
//                   Toast({
//                       message: error.response.data.message,
//                       duration: 1500,
//                       forbidClick: true
//                   });
//           }
//           return Promise.reject(error.response);
//       }
//   }
// });




export default axios;