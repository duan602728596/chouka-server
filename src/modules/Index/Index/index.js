import Vue from 'vue';
import Component from 'vue-class-component';
import { Layout, Form, Input, Button } from 'ant-design-vue';
import style from './index.sass';
import publicStyle from '../../../components/publicStyle/publicStyle.sass';
import Footer from '../../../components/Footer/index';

@Form.create()
@Component({
  props: {
    form: Object
  }
})
class Index extends Vue {
  // 查询事件
  handleFormSearchSubmit(event) {
    event.preventDefault();

    const { form } = this.$props;
    const { validateFields } = form;

    validateFields((err, value) => {
      if (err) {
        return;
      }

      window.location.href = `/result?q=${ value.q }`;
    });
  }

  render() {
    const { form } = this.$props;
    const { getFieldDecorator } = form;

    return (
      <Layout class={ publicStyle.layout }>
        {/* 查询 */}
        <Layout.Content class={ publicStyle.content }>
          <h1 class={ style.title }>卡片查询：</h1>
          <Form onSubmit={ this.handleFormSearchSubmit }>
            <Form.Item>
              {
                getFieldDecorator('q', {
                  rules: [
                    {
                      required: true,
                      message: '请输入查询条件'
                    }
                  ]
                })(<Input placeholder="请输入摩点昵称或摩点id" />)
              }
            </Form.Item>
            <Button class={ style.searchBtn } type="primary" htmlType="submit">查询</Button>
          </Form>
        </Layout.Content>
        <Footer />
      </Layout>
    );
  }
}

export default Index;