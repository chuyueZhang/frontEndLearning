import '../less/index.less';
import $ from 'jquery';
import exec from './common';

exec();
console.log('加载index.js 成功');
$(() => {
  $('#btn').click(() => {
    import('./print').then(({ print }) => {
      print('点击');
    });
  });
});
