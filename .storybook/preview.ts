import type { Preview } from '@storybook/nextjs-vite'
import '@/app/globals.css';
import "./storybook.css"

const preview: Preview = {
  parameters: {
     layout: 'centered', 
    backgrounds: {
      options: {
        dark: { name: 'Dark', value: '#333' },
        light: { name: 'Light', value: '#F7F9F2' },
        base: { name: 'Base', value: '#FFFBEB' },
      },
    },
    initialGlobals: {
      backgrounds: { value: 'base' },
    },
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },
};

export default preview;