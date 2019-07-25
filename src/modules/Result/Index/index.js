import Vue from 'vue';
import Component from 'vue-class-component';
import { Layout, List } from 'ant-design-vue';
import classNames from 'classnames';
import style from './index.sass';
import publicStyle from '../../../components/publicStyle/publicStyle.sass';
import Footer from '../../../components/Footer/index';

@Component
class Index extends Vue {
  beforeCreate() {
    // 验证是否有查询条件
    const { $router } = this;
    const q = $router.history?.current?.query?.q;

    if (q === undefined || q === null) {
      $router.push('/Index');
    }
  }

  // 渲染list
  listRender(data) {
    return data.map((item, index) => {
      return (
        <List.Item key={ index }>
          <div class={ classNames(style.gItem, 'clearfix') }>
            <b class={ style.name }>{ item.name }</b>
            <span class={ style.cardLen }>{ item.length || 0 }</span>
          </div>
        </List.Item>
      );
    });
  }

  groupRender() {
    const list = this.$store.getters['result/getList']();

    return list.map((item, index) => {
      return (
        <li key={ index } class={ style.listItem }>
          <h2 class={ style.listTitle }>
            等级：{ item.level }
            <span class={ style.len }>（{ item.has }/{ item.data.length }）</span>
          </h2>
          <List size="small" bordered={ true }>{ this.listRender(item.data) }</List>
        </li>
      );
    });
  }

  render() {
    const query = this.$store.getters['result/getQuery']();
    const points = this.$store.getters['result/getPoints']();

    return (
      <Layout class={ publicStyle.layout }>
        <Layout.Content class={ publicStyle.content }>
          <h1 class={ style.title }>{ query ? `${ query }的` : null }查询结果：</h1>
          <p>
            积分：
            { points }
          </p>
          <ul class={ style.list }>{ this.groupRender() }</ul>
        </Layout.Content>
        <Footer />
      </Layout>
    );
  }
}

export default Index;