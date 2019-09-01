import Vue from 'vue';
import Component from 'vue-class-component';
import { Layout, Button } from 'ant-design-vue';
import publicStyle from '../../../components/publicStyle/publicStyle.sass';
import style from './index.sass';
import CrySvgComponent from './images/cry.component.svg';

@Component
class Index extends Vue {
  render() {
    return (
      <Layout class={ publicStyle.layout }>
        <Layout.Content class={ publicStyle.content }>
          <div class={ style.textBox }>
            <CrySvgComponent class={ style.cry } />
            <p class={ style.text }>Page not found</p>
            <router-link to="/Index">
              <Button type="primary">返回</Button>
            </router-link>
          </div>
        </Layout.Content>
      </Layout>
    );
  }
}

export default Index;