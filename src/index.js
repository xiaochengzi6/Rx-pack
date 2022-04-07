import ReactDOM from 'react-dom'
import Welcome from './build'
import a from './count';
// import aa from './count_1'
if (module.hot) {
  module.hot.accept('./count.js', function() {
      // 监听count资源修改，并作相应页面更新
      // import ('./count')
      console.log("热更新",a)
  })
}
ReactDOM.render(
  <Welcome />,
  document.getElementById('root')
);
