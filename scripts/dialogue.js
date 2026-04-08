const template_dialogue_box = document.getElementsByClassName('dialogue_box')[0];

export default class Dialogue {
    constructor(name, image) {
        this._name = name;
        this._image = image;
        this._dialogue_box = template_dialogue_box.cloneNode(true);
        this._dialogue_box.id = name + "_dialogue_box";
        this._dialogue_box.querySelector(".portrait img").src = image;
        this._dialogue_box.querySelector(".name").textContent = name;
        document.body.appendChild(this._dialogue_box);
    }

    // returns a promise that resolves when the dialogue box is done showing
    // so we can await it before revealing text
    show() {
        return new Promise((resolve) => {
            // aniamtes box sliding up from bottom and reveals initial dialogue
            this._dialogue_box.style.display = "flex";

            // the first timeout is here to queue it for next frame so the animation works
            setTimeout(() => {
                this._dialogue_box.style.bottom = "1rem";

                // second timeout resolves promise after animation finishes
                setTimeout(() => resolve('finished'), 1000);
            }, 1);
        });
    } 

    // not a promise cuz theres really no need for it
    hide() {
        // animates box sliding back down to bottom
        this._dialogue_box.style.bottom = "-100%";
        setTimeout(() => {
            this._dialogue_box.style.display = "none";
        }, 1000);
    }

    // returns a promise that resolves when the text reveal is finished
    reveal_text(new_text, text_speed = 30) {
        return new Promise((resolve) => {
            // uses a setInterval to reveal the text one character at a time
            const text_box = this._dialogue_box.querySelector(".text");
            text_box.textContent = "";
            let index = 0
            
            const typing_interval = setInterval(() => {
                // stop interval when all text is done
                if (index >= new_text.length - 1) {
                    clearInterval(typing_interval);
                    resolve('finished');
                }
                // smoothly scrolls the text box to the bottom
                text_box.scrollTo({
                    top: text_box.scrollHeight,
                    behavior: 'smooth'
                });
                // adds a single character
                text_box.textContent += new_text[index];
                index++
            }, text_speed);
        });
    }
    
    // reveals multiple texts in sequence with a delay between them
    // also a promise
    async reveal_multiple_texts(text_speed = 30, delay_between_texts = 1000, texts) {
        return new Promise(async (resolve) => {
            for (const text of texts) {
                await this.reveal_text(text, text_speed);
                await new Promise(resolve => setTimeout(resolve, delay_between_texts));
            }
            resolve('finished');
        })
    }
}

const yahu_dialogue = new Dialogue("Benjamin Netanyahu", "../resources/images/netanyahu.png");
await yahu_dialogue.show();
await yahu_dialogue.reveal_multiple_texts(30, 1000, [
    "Hi! Im your boss, Bejamin Netanyahu.",
    "I have a very important task for you.",
    "I need you to sell potions and make money for me.",
    "Thanks brojob"
]);
yahu_dialogue.hide();