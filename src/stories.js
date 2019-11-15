// src/stories.js

import { storiesOf } from '@storybook/vue';
import { withKnobs, text, select, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { withA11y } from '@storybook/addon-a11y';

import MsButton from './components/MsButton';
import MsPersona from './components/MsPersona';
import MsSpinner from './components/MsSpinner';
import MsShimmer from './components/MsShimmer';

storiesOf('Ms Components', module)
  .addDecorator(withKnobs)
  .addDecorator(withA11y)
  .add('Button', () => ({
    components: { MsButton },
    props: {
      label: {
        default: text('label', 'Hello Storybook')
      },
      type: {
        default: select('type', ['solid', 'flat'], 'solid')
      },
      size: {
        default: select('size', ['sm', 'md', 'lg'], 'md')
      },
      arrow: {
        default: boolean('arrow', true)
      },
      disabled: {
        default: boolean('disabled', false)
      }
    },
    template: `
      <div class='preview'>
        <MsButton :label="label" :size="size" :arrow="arrow" :type="type" :disabled="disabled"></MsButton>
      </div>
    `
  }))



    .add('Persona', () => ({
      components: { MsPersona },
      props: {
        name: {
          default: text('name', 'Annie Lindqvist')
        },
        title: {
          default: text('title', 'Software Engineer')
        },
        status: {
          default: select('status', ['online', 'busy', 'away', 'blocked', 'indeterminate'], 'online')
        },
        size: {
          default: select('size', [24, 48], 48)
        },
        imageUrl:  {
          default: text('imageUrl', 'https://picsum.photos/200')
        }
      },
      template: `
        <div class='preview'>
          <MsPersona :name="name" :size="size" :title="title" :status="status" :imageUrl="imageUrl"></MsPersona>
        </div>
      `
    }))



    .add('Spinner', () => ({
      components: { MsSpinner },
      props: {
        size: {
          default: select('size', ['xs', 'sm', 'md', 'lg'], 'md')
        },
      },
      template: `
        <div class='preview'>
          <MsSpinner :size="size"></MsSpinner>
        </div>
      `
    }))



    .add('Shimmer', () => ({
      components: { MsShimmer },
      props: {
        width: {
          default: text('width', '156px')
        },
        type: {
          default: select('type', ['persona'], 'persona')
        }
      },
      template: `
        <div>
          <div class='preview'>
            <MsShimmer :width="width" :type="type"></MsShimmer>
          </div>
          
        </div>
      `
    }));

    /* <div class='preview'>
            <button style='margin-top:20px;' onClick='console.log("todo")'>Simulate content load</button>
          </div> */