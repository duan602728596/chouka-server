import Vue from 'vue';
import Component from 'vue-class-component';
import publicStyle from '../../components/publicStyle/publicStyle.sass';
import Index from './Index/index';

@Component
class Layout extends Vue {
  render() {
    return (
      <div class={ publicStyle.layoutBox }>
        <helmet-provider>
          <helmet>
            <title>卡片查询</title>
          </helmet>
        </helmet-provider>
        <Index />
      </div>
    );
  }
}

export default Layout;