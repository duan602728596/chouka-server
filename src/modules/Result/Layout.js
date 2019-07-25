import Vue from 'vue';
import Component from 'vue-class-component';
import publicStyle from '../../components/publicStyle/publicStyle.sass';
import Index from './Index/index';

@Component
class Layout extends Vue {
  render() {
    const query = this.$store.getters['result/getQuery']();

    return (
      <div class={ publicStyle.layoutBox }>
        <helmet-provider>
          <helmet>
            <title>{ query ? `${ query }的` : null }查询结果</title>
          </helmet>
        </helmet-provider>
        <Index />
      </div>
    );
  }
}

export default Layout;