const template_dialogue_box = document.getElementsByClassName('dialogue_box')[0];

export default class Dialogue {
    constructor(name, image) {
        this._name = name;
        this._image = image;
        this._dialogue_box = template_dialogue_box.cloneNode(true);
        this._dialogue_box.id = name + "_dialogue_box";
        this._dialogue_box.querySelector(".portrait img").src = image;
        this._dialogue_box.querySelector(".name").textContent = name;
        this._options_menu = this._dialogue_box.querySelector(".options");
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
                this._options_menu.style.bottom = "-100%";

                // second timeout resolves promise after animation finishes
                setTimeout(() => resolve('finished'), 1000);
            }, 1);
        });
    } 

    // not a promise cuz theres really no need for it
    hide(delay = 1000) {
        // animates box sliding back down to bottom
        setTimeout(() => {
            this._dialogue_box.style.bottom = "-100%";
            this._options_menu.style.bottom = "0";

            // timeout to hide the box after the animation finishes
            setTimeout(() => {
                this._dialogue_box.style.display = "none";
            }, 1000);
        }, delay);
    }

    // returns a promise that resolves when the text reveal is finished
    reveal_text(new_text, text_speed = 30, response_options = []) {
        return new Promise((resolve) => {
            // uses a setInterval to reveal the text one character at a time
            const text_box = this._dialogue_box.querySelector(".text");
            
            text_box.textContent = "";
            let index = 0

            const typing_interval = setInterval(() => {
                // stop interval when all text is done
                // also present dialogue options
                if (index >= new_text.length - 1) {
                    const controller = new AbortController();
                    clearInterval(typing_interval);
                    
                    // only provide options if there are any, otherwise just resolve the promise
                    if (!response_options.length) {
                        resolve();
                    } else {
                        // create a new button for each option and add it to the options menu
                        const response_divs = []

                        response_options.forEach((option, i) => {
                            const template = this._options_menu.querySelector(".template");
                            const new_button = template.cloneNode(true);
                            new_button.classList.remove("template");
                            new_button.textContent = option;
                            new_button.display = "block";
                            this._options_menu.appendChild(new_button);
                            response_divs.push(new_button);

                            // clicking on a button resolves with the index of the button clicked (so we know which option was chosen)
                            new_button.addEventListener("click", () => {
                                // aborts the event listener so it doesn't resolve multiple times if multiple buttons are clicked
                                controller.abort();

                                resolve(i);
                                this._options_menu.style.bottom = "-100%";
                                
                                // delete all other dialogue options
                                setTimeout(() => {
                                    for (const div of response_divs) {
                                        div.remove();
                                    }
                                }, 1000);
                            }, { signal: controller.signal });
                        });
                        // animates the options menu sliding up from bottom
                        this._options_menu.style.bottom = "0";
                    }
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
}