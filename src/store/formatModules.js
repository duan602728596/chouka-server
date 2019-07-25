/* 格式化module，分发state */
function formatModules(modules, initialState) {
  for (const key in modules) {
    const module = modules[key];
    const data = initialState[key];

    if (data) {
      module.state = Object.assign(module.state || {}, data || {});
    }
  }

  return modules;
}

export default formatModules;