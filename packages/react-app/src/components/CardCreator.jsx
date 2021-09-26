import React, { useState, useReducer } from "react";
import { Button, Form, Input } from "antd";
import styles from "./CardCreator.module.css";
import MonsterSVG, { randomBody, randomEyes, randomTeeth } from "../components/MonsterSVG";
import { randInt } from "../helpers/math";

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
  const [name, setName] = useState("");
  const [story, setStory] = useState("");
  const [homeland, setHomeland] = useState();
  const [attributes, setAttributes] = useState({
    [ATTRIBUTES.HEALTH]: undefined,
    [ATTRIBUTES.ATTACK]: undefined,
    [ATTRIBUTES.SHIELD]: undefined,
  });
  const [styleState, styleDispatch] = useReducer(styleReducer, null, reducerInit);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const listItems = [
    { label: "Name", value: name },
    { label: "Story", value: story },
    { label: "Homeland", value: homeland },
  ];
  for (let [key, value] of Object.entries(attributes)) {
    listItems.push({ label: key, value });
  }

  const onFinish = values => {
    setName(values["Name"]);
    setStory(values["Story"]);
    setIsSubmitted(true);
  };

  const onFinishFailed = errorInfo => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <Form layout="vertical" name="create-monster" onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Form.Item name="Name" label="Name" rules={[{ required: true, message: "Enter monster's name" }]}>
          <Input value={name} />
        </Form.Item>

        <MonsterStyler styleState={styleState} styleDispatch={styleDispatch} />

        <Form.Item name="Story" label="Story" rules={[{ required: true, message: "Enter monster's backstory" }]}>
          <Input.TextArea value={story} rows={4} />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Generate Monster
        </Button>
      </Form>

      <ul className={styles.AttributesBlock}>
        <li>Homeland: {homeland}</li>
        <li>
          {ATTRIBUTES.HEALTH}: {attributes[ATTRIBUTES.HEALTH]}
        </li>
        <li>
          {ATTRIBUTES.ATTACK}: {attributes[ATTRIBUTES.ATTACK]}
        </li>
        <li>
          {ATTRIBUTES.SHIELD}: {attributes[ATTRIBUTES.SHIELD]}
        </li>
      </ul>

      <Button
        onClick={() => {
          setAttributes(randomAttributes());
        }}
      >
        Generate random stats
      </Button>
    </div>
  );
}

function MonsterStyler({ styleState, styleDispatch }) {
  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <div>
      <div
        onClick={() => {
          setIsEditMode(true);
        }}
      >
        <MonsterSVG teethNum={styleState.teethNum} bodyNum={styleState.bodyNum} eyesNum={styleState.eyesNum} />
        <div>click monster to edit style</div>
      </div>

      <div>
        {isEditMode ? (
          <MonsterStyleEditor
            styleState={styleState}
            styleDispatch={styleDispatch}
            onEditFinish={() => {
              setIsEditMode(false);
            }}
          />
        ) : null}
      </div>
    </div>
  );
}

function MonsterStyleEditor({ styleState, styleDispatch, onEditFinish }) {
  return (
    <div>
      <div>Edit Me!</div>
      <Button onClick={onEditFinish}>done editing</Button>
    </div>
  );
}

function randomAttributes() {
  return {
    [ATTRIBUTES.HEALTH]: randomHealth(),
    [ATTRIBUTES.SHIELD]: randomShield(),
    [ATTRIBUTES.ATTACK]: randomAttack(),
  };
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

function styleReducer(state, action) {
  if (action.type === "randomize") {
    return reducerInit();
  }
}

function reducerInit() {
  return {
    teethNum: randomTeeth(),
    eyesNum: randomEyes(),
    bodyNum: randomBody(),
  };
}
