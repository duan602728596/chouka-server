import Vue from 'vue';
import Component from 'vue-class-component';
import loadActions from '../../store/loadActions';
import actions from './actions/index';
import publicStyle from '../../components/publicStyle/publicStyle.sass';
import Index from './Index/index';

@loadActions({
  result: actions
})
@Component({
  metaInfo: {
    titleTemplate() {
      const query = this.$store.getters['result/getQuery']();

      return `${ query ? `${ query }的` : '' }查询结果`;
    }
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