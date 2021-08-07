import React, { useEffect, useState } from "react";
import { Howl } from "howler";

export default function RenderSounds() {
  const [volume, setVolume] = useState(0.5);
  useEffect(() => {
    setVolume(document.getElementById("volumeComponent").value);
    if (sound !== null) {
      sound.volume(volume / 100);
    }
  });

  const handleDelete = () => {
    let soundList = JSON.parse(localStorage.getItem("file"));
    let currentSound = document.getElementById("soundList").value;

    for (let i = 0; i < soundList.length; i++) {
      if (currentSound === soundList[i].file) {
        soundList.splice(i, 1);
      }
      localStorage.setItem("file", JSON.stringify(soundList));
      window.location.reload(true);
    }
  };
  return (
    <>
      <select id="soundList">{list}</select>
      <button
        onClick={() => {
          soundPlay(document.getElementById("soundList").value);
        }}
      >
        Sprawdź
      </button>
      <button
        onClick={() => {
          soundStop();
        }}
      >
        Zatrzymaj
      </button>
      <button onClick={handleDelete}>Usuń</button>
    </>
  );
}
const soundList = [
  {
    sound:
      "https://www.jp.square-enix.com/music/sem/page/FF7R/ost/assets/mp3/disc3-23.mp3",
    label: "The Hideout",
  },
  {
    sound:
      "http://docs.google.com/uc?export=open&id=1VimOZ7qLx7nUGCloe_q1Yw0WLCLbzPhb",
    label: "False Knight",
  },
  {
    sound:
      "http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/theme_01.mp3",
    label: "Galaxy Invaders",
  },
  {
    sound:
      "http://commondatastorage.googleapis.com/codeskulptor-demos/pyman_assets/ateapill.ogg",
    label: "A tea pill",
  },
];

if (localStorage.getItem("file")) {
  var sounds = JSON.parse(localStorage.getItem("file"));
  for (let i = 0; i < sounds.length; i++) {
    let temp = { sound: sounds[i].file, label: sounds[i].name };
    soundList.push(temp);
  }
}

let sound = null;
export function soundPlay(src) {
  if (sound != null) {
    sound.stop();
    sound.unload();
    sound = null;
  }
  sound = new Howl({
    src,
    html5: true,
  });
  sound.play();
}

export const soundStop = () => {
  if (sound != null) sound.stop();
};

const list = soundList.map((soundObject) => {
  return <option value={soundObject.sound}>{soundObject.label}</option>;
});
