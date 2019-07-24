import Vue from 'vue';
import Component from 'vue-class-component';
import { Layout } from 'ant-design-vue';
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

  render() {
    const q = this.$router.history?.current?.query?.q;

    return (
      <Layout class={ publicStyle.layout }>
        <Layout.Content class={ publicStyle.content }>
          <h1 className={ style.title }>【{ q }】的查询结果：</h1>
        </Layout.Content>
        <Footer />
      </Layout>
    );
  }
}

export default Index;