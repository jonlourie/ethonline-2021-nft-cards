import React, { useState, useReducer } from "react";
import {Button} from 'antd'

const ATTRIBUTES = {
  HEALTH: "Health",
  ATTACK: "Attack",
  SHIELD: "Shield",
};

const HOMELANDS = {
  EARTH: "Earth",
  ICE: "Ice",
  FIRE: "Fire",
  WATER: "Water",
  STARS: "Stars",
  SKY: "Sky",
};

export default function CardCreator({}) {
  const [name, setName] = useState();
  const [story, setStory] = useState();
  const [homeland, setHomeland] = useState();
  const [attributes, setAttributes] = useState({
    [ATTRIBUTES.HEALTH]: undefined,
    [ATTRIBUTES.ATTACK]: undefined,
    [ATTRIBUTES.SHIELD]: undefined,
  });
  const [styleState, styleDispatch] = useReducer(styleReducer, null, reducerInit)

  const listItems = [
    { label: "Name", value: name },
    { label: "Story", value: story },
    { label: "Homeland", value: homeland },
  ];
  for (let [ key, value ] of Object.entries(attributes)) {
    listItems.push({ label: key, value });
  }

  return (
    <div>
      <Button onClick={() => {
        setAttributes(randomAttributes());
      }}>Generate random stats</Button>
      <ul>
        {listItems.map(({ label, value }) => {
          return (
            <li key={label}>
              {label}: {value}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

// Generates a random integer in [min, max)
function randInt(min, max) {
  if (max === undefined) {
    max = min;
    min = 0;
  }
  return Math.floor(Math.random() * (max - min) + min);
}

function randomAttributes() {
  return {
    [ATTRIBUTES.HEALTH]: randomHealth(),
    [ATTRIBUTES.SHIELD]: randomShield(),
    [ATTRIBUTES.ATTACK]: randomAttack(),
  }
}

function randomHealth() {
  return randInt(1, 51) + randInt(1, 51);
}

function randomAttack() {
  return randInt(1, 41) + randInt(1, 41);
}

function randomShield() {
  // Shield is a more valuable skill, so it has a lower random value
  return randInt(1, 21) + randInt(1, 21);
}

const HEAD_CHOICES = ["Horn", "Hat", "Antenna"];

function makeHeadChoice(name, red, green, blue) {
  if (HEAD_CHOICES.indexOf(name) === -1) {
    throw `Head choice must be one of ${HEAD_CHOICES.map(choice => `"${choice}"`).join(", ")}`;
  }
  for (const color of [red, green, blue]) {
    if (color < 0 || color > 255 || !Number.isInteger(color)) {
      throw `All colors must be integers in [0, 255]`;
    }
  }
  return { type: "Head", name: name, color: { red, green, blue } };
}

function makeRandomHeadChoice() {
  return makeHeadChoice(HEAD_CHOICES[randInt(HEAD_CHOICES.length)], randInt(255), randInt(255), randInt(255));
}

const MIN_HEIGHT = 40;
const MAX_HEIGHT = 200;

function makeHeight(height) {
  if (height < MIN_HEIGHT || height > MAX_HEIGHT) {
    throw `height must be in range [${MIN_HEIGHT}, ${MAX_HEIGHT}]`;
  }
  return { type: "Height", value: height };
}

function makeRandomHeight() {
  return makeHeight(randInt(MIN_HEIGHT, MAX_HEIGHT));
}

const EYE_CHOICES = ["Single Eye", "Two Eyes", "Laser Eyes"];

function makeEyes(name) {
  if (EYE_CHOICES.indexOf(name) === -1) {
    throw `Eye choice must be one of ${EYE_CHOICES.map(choice => `"${choice}"`).join(", ")}`;
  }
  return {
    type: "Eyes",
    name: name,
  };
}

function makeRandomEyes() {
  return makeEyes(EYE_CHOICES[randInt(EYE_CHOICES.length)]);
}

function styleReducer(state, action) {
  if (action.type === "randomize") {
    return reducerInit();
  }
}

function reducerInit() {
  return {
    styles: [makeRandomHeadChoice(), makeRandomEyes(), makeRandomHeight()],
  };
}

/**
 * "Hat": {
 *     type: "enum"
 * }
 */
