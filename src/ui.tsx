/* global AFRAME */
import './assets/style.css';
import { render } from 'solid-js/web';
import { Show, createSignal } from 'solid-js';
import { IoSettingsOutline } from 'solid-icons/io';
import { MicButton } from './MicButton';
import { UsernameInput } from './UsernameInput';

const [showSettings, setShowSettings] = createSignal(false);
const [entered, setEntered] = createSignal(false);

const SettingsScreen = () => {
  return (
    <div class="naf-centered-fullscreen">
      <div class="flex flex-col gap-2">
        <label for="username">Your name</label>
        <UsernameInput entity="#player" />
      </div>
      <button
        type="button"
        id="saveSettingsButton"
        class="btn"
        onClick={() => {
          setShowSettings(false);
        }}
      >
        OK
      </button>
    </div>
  );
};

const EnterScreen = () => {
  return (
    <div class="naf-centered-fullscreen">
      <div class="flex flex-col gap-2">
        <label for="username">Your name</label>
        <UsernameInput entity="#player" />
      </div>
      <button
        type="button"
        id="playButton"
        class="btn"
        onClick={() => {
          // @ts-ignore
          AFRAME.scenes[0].emit('connect');
          setEntered(true);
        }}
      >
        Enter
      </button>
    </div>
  );
};

const BottomBar = () => {
  return (
    <div class="naf-bottom-bar-center">
      <button
        type="button"
        id="settingsButton"
        class="btn-secondary btn-rounded"
        onClick={() => {
          setShowSettings(true);
        }}
        title="Settings"
      >
        <IoSettingsOutline size={24} />
      </button>
      <MicButton />
    </div>
  );
};

const App = () => {
  return (
    <>
      <Show when={!entered()}>
        <EnterScreen />
      </Show>
      <Show when={showSettings()}>
        <SettingsScreen />
      </Show>
      <Show when={entered() && !showSettings()}>
        <BottomBar />
      </Show>
    </>
  );
};

const root = document.createElement('div');
document.body.appendChild(root);
render(() => <App />, root);
