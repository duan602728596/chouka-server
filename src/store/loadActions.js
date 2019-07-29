import Vue from 'vue';
import Component from 'vue-class-component';

/**
 * 异步注入vuex的修饰器
 * @param { object } actions
 */
function loadActions(actions) {
  /**
   * @param { Function } Module: 需要修饰的模块
   */
  return function(Module) {
    return @Component({
      name: Module.name,
      actions
    })
    class extends Vue {
      render() {
        return <Module />;
      }
    };
  };
}

export default loadActions;