import Dialogue from "./dialogue.js";

const yahu_dialogue = new Dialogue("Benjamin Netanyahu", "../resources/images/netanyahu.png");

await yahu_dialogue.show();

const dialogue_options = [
    [
        'Ok cool',
        "No you aren't dude"
    ],
    [
        'Sure thing boss',
        'I dont wanna do that'
    ]
]

const text_speed = 30;
const dialogue_chosen = await yahu_dialogue.reveal_text("Hi! Im your boss, Bejamin Netanyahu.", text_speed, dialogue_options[0]);

// first dialogue options
let next_text
switch (dialogue_chosen) {
    case 0:
        next_text = "Great! Now make potions for me";
        break;
    case 1:
        next_text = "Yeah too bad brojob, you're gonna make potions for me anyway";
        break;
}
await yahu_dialogue.reveal_text(next_text, text_speed, dialogue_options[1]);

// second dialogue options
switch (dialogue_chosen) {
    case 0:
        next_text = "Thats the spirit!";
        break;
    case 1:
        next_text = "Yo dude I really dont care what you wanna do, just make the potions for me";
        break;
}
await yahu_dialogue.reveal_text(next_text);


await yahu_dialogue.hide(1000);