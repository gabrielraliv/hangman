// Constants and variables
const words_list: string[] = ["frog", "tree", "book", "fish", "star", "milk", "door", "cake", "lamp", "shoe", "rain", "snow", "jump", "duck", "ball", "nest", "wind", "coin", "sock", "kite"];

const alphabet: string[] = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

const word_container: HTMLElement | null = document.getElementById("word_container");

const input_container: HTMLElement | null = document.getElementById("input_container");

const lives_container: HTMLElement | null = document.getElementById("lives_container");

const result_container: HTMLElement | null = document.getElementById("result_container");

let random_word: string = "";

let display_word: string = "";

let lives: number = 6;

// Functions

/**
 * Returns a random string element from a string array
 * @param my_list The array of strings to select from.
 * @returns Random string element from the array.
 */
function draw_random_word(my_list: string[]): string {
    return my_list[Math.floor(Math.random() * my_list.length)];
}

/**
 * Creates a string filled with underscores ("_"), matching the length of the input string.
 * @param word The input string to base the output length on.
 * @returns A string of underscores with the same length as the input.
 */
function build_display_word(word: string): string {
    let output: string = "";
    for (let x = 0; x < word.length; x++) {
        output += "_";
    }
    return output;
}

/**
 * Create a string of <span> elements containing every word of the input string.
 * @param word The string to be converted to <span> elements.
 * @returns 
 */
function build_display_element(word: string): string {
    let display_element: string = "";
    for (let x = 0; x < word.length; x++) {
        display_element += `<span>${word[x]}</span>`;
    }
    return display_element;
}

/**
 * Check if a char(string) is in the random word and update de display text if it do.
 * @param letter The char(string) that will be checked.
 * @returns The updated display text.
 */
function update_display_word(letter: string): string {
    let new_display_text: string = "";
    let word_in: boolean = false;
    for (let y = 0; y < random_word.length; y++) {
        if (letter.toLocaleLowerCase() == random_word[y].toLocaleLowerCase()) {
            new_display_text += random_word[y];
            word_in = true;
        }
        else {
            new_display_text += display_word[y];
        }
    }
    if (!word_in) {
        update_lives(1);
    }
    return new_display_text;
}

/**
 * Update the inner HTML content of the word container with the input string.
 * @param new_display_text The string to be displayed in the container.
 */
function update_display(new_display_text: string): void {
    if (word_container != null) {
        word_container.innerHTML = new_display_text;
    }
}

/**
 * Create a button element for each element from a string array.
 */
function build_input_buttons(): void {
    let input_text = "";
    for (let y = 0; y < alphabet.length; y++) {
        input_text += `<button class="input_button" onclick="button_click('${alphabet[y]}')">${alphabet[y]}</button>`;
    }
    if (input_container != null) {
        input_container.innerHTML = input_text;
    }
}

/**
 * Check if the random word contains the button char(string) and update the display text.
 * @param letter The input letter from the assigned button.
 */
function button_click(letter: string): void {
    display_word = update_display_word(letter);
    update_display(build_display_element(display_word));
    check_score();
}

/**
 * Subtracts the number input value from the lives count and updates the container inner html.
 * @param lost_lives The number of lives that will be subtracted.
 */
function update_lives(lost_lives: number): void {
    lives -= lost_lives;
    if (lives_container != null) {
        if (lives < 0) {
            lives_container.innerHTML = `Lives: ${0}/6`;
        }
        else {
            lives_container.innerHTML = `Lives: ${lives}/6`;
        }
    }
}

/**
 * Check if the player won or lost and update the result container.
 */
function check_score(): void {
    if (lives <= 0) {
        console.log("passou")
        if (result_container != null) {
            console.log("passou2")
            result_container.innerHTML = "You Lost!";
            update_display(build_display_element(random_word));
        }
    }
    if (display_word == random_word) {
        console.log("Passou3")
        if (result_container != null) {
            result_container.innerHTML = "You Won!"
        }
    }
}

function main(): void {
    random_word = draw_random_word(words_list);
    display_word = build_display_word(random_word);
    update_display(build_display_element(display_word));
    build_input_buttons();
    update_lives(0);
}

main();
