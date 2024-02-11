/* global THREE */
import { Component, Show, createEffect, createSignal, onMount } from 'solid-js';

const randomColor = () => {
  // @ts-ignore
  return '#' + new THREE.Color(Math.random(), Math.random(), Math.random()).getHexString();
};

export const [username, setUsername] = createSignal('user-' + Math.round(Math.random() * 10000));
export const [color, setColor] = createSignal(randomColor());

interface Props {
  enableColorPicker?: boolean;
}

export const UsernameInput: Component<Props> = (props) => {
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
      <Show when={props.enableColorPicker ?? true}>
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
      </Show>

      <input
        ref={nametagInput}
        class="h-7 px-1"
        id="username"
        value={username()}
        oninput={() => {
          setUsername(nametagInput.value);
        }}
      />
    </div>
  );
};
