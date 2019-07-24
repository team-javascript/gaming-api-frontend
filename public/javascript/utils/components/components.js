import Html from '../html/Html';
import Api from '../api/Api';
export default () => new Components();

class Components {
  getAppContext() {
    return Html().select('#app');
  }

  getWrapperDiv() {
    return Html()
      .create('div')
      .addClass('wrapper');
  }
}
