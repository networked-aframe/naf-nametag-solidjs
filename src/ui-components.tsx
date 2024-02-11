import './assets/style.css';
import { customElement, noShadowDOM } from 'solid-element';
import { MicButton } from './MicButton';

customElement('naf-mic-button', () => {
  noShadowDOM();
  return <MicButton />;
});
