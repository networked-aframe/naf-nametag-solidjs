import './assets/style.css';
import { customElement, noShadowDOM } from 'solid-element';
import { MicButton } from './MicButton';
import { UsernameInput } from './UsernameInput';

customElement('naf-mic-button', () => {
  noShadowDOM();
  return <MicButton />;
});

customElement('naf-username-input', () => {
  noShadowDOM();
  return <UsernameInput />;
});
