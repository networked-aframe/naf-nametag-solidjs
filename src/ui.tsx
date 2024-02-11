/* global AFRAME THREE */
import './assets/style.css';
import { render } from 'solid-js/web';
import { Show, createEffect, createSignal, onMount } from 'solid-js';

const randomColor = () => {
  // @ts-ignore
  return '#' + new THREE.Color(Math.random(), Math.random(), Math.random()).getHexString();
};

const [showSettings, setShowSettings] = createSignal(false);
const [entered, setEntered] = createSignal(false);
const [username, setUsername] = createSignal('user-' + Math.round(Math.random() * 10000));
const [color, setColor] = createSignal(randomColor());

const ColorChangerAndUsername = () => {
  onMount(() => {
    const name = localStorage.getItem('username');
    if (name) {
      setUsername(name);
    }
  });

  createEffect(() => {
    const player = document.getElementById('player');
    if (player) {
      // @ts-ignore
      player.setAttribute('player-info', {
        name: username(),
        color: color(),
      });
    }
    localStorage.setItem('username', username());
  });

  let colorChangerBtn!: HTMLButtonElement;
  let nametagInput!: HTMLInputElement;
  return (
    <div>
      <button
        ref={colorChangerBtn}
        id="color-changer"
        class="h-7 w-7"
        style={`background-color:${color()};color:${color()}`}
        onClick={() => {
          setColor(randomColor());
        }}
      >
        ■
      </button>

      <input
        ref={nametagInput}
        class="h-7 px-1"
        id="username-overlay"
        value={username()}
        oninput={() => {
          setUsername(nametagInput.value);
        }}
      />
    </div>
  );
};

const SettingsScreen = () => {
  return (
    <div class="naf-centered-fullscreen">
      <ColorChangerAndUsername />
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
      <ColorChangerAndUsername />
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
        class="btn text-sm"
        onClick={() => {
          setShowSettings(true);
        }}
      >
        Settings
      </button>
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
