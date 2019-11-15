/* import { configure } from '@storybook/vue';

// automatically import all files ending in *.stories.js
configure(require.context('../stories', true, /\.stories\.js$/), module);
 */


import { configure, addDecorator } from '@storybook/vue';
import Vue from 'vue';

/* import { withInfo } from 'storybook-addon-vue-info'
addDecorator(withInfo) */

// Import your custom components.
import MsButton from '../src/components/MsButton';
import '../src/stories.scss';
import 'office-ui-fabric-core/dist/css/fabric.min.css';

// Register custom components.
Vue.component('ms-button', MsButton);

function loadStories() {
  // You can require as many stories as you need.
  require('../src/stories');
}

configure(loadStories, module);