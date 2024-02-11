import './assets/style.css';
import { customElement, noShadowDOM } from 'solid-element';
import { ChatButton, ChatPanel } from './Chat';
import { MicButton } from './MicButton';
import { UsernameInput } from './UsernameInput';

customElement('naf-mic-button', () => {
  noShadowDOM();
  return <MicButton />;
});

customElement('naf-username-input', { entity: '#player', enableColorPicker: true }, (props) => {
  noShadowDOM();
  return <UsernameInput {...props} />;
});

customElement('naf-chat-button', () => {
  noShadowDOM();
  return <ChatButton />;
});

customElement('naf-chat-panel', () => {
  noShadowDOM();
  return <ChatPanel />;
});
