import Vue from 'vue';
import Component from 'vue-class-component';
import { Layout } from 'ant-design-vue';
import style from './index.sass';

/* 网站通用footer */
@Component
class Footer extends Vue {
  render() {
    return (
      <Layout.Footer class={ style.footer }>
        应援会
      </Layout.Footer>
    );
  }
}

export default Footer;