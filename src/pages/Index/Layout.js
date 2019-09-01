import Vue from 'vue';
import Component from 'vue-class-component';
import publicStyle from '../../components/publicStyle/publicStyle.sass';
import Index from './Index/index';

@Component({
  metaInfo: {
    title: '卡片查询'
  }
})
class Layout extends Vue {
  render() {
    return (
      <div class={ publicStyle.layoutBox }>
        <Index />
      </div>
    );
  }
}

export default Layout;