import './assets/style.css';
import { customElement, noShadowDOM } from 'solid-element';
import { ChatButton } from './Chat';
import { MicButton } from './MicButton';
import { UsernameInput } from './UsernameInput';
import { UsersButton } from './UsersButton';

customElement('naf-mic-button', { entity: '#player' }, (props) => {
  noShadowDOM();
  return <MicButton {...props} />;
});

customElement('naf-username-input', { entity: '#player', enableColorPicker: true }, (props) => {
  noShadowDOM();
  return <UsernameInput {...props} />;
});

customElement('naf-chat-button', () => {
  noShadowDOM();
  return <ChatButton />;
});

customElement('naf-users-button', () => {
  noShadowDOM();
  return <UsersButton />;
});
