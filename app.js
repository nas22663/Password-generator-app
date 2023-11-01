const slider = document.getElementById('myRange');
const output = document.getElementById('output');
let passwordLength = 0

const first = document.querySelector('.right .first');
const second = document.querySelector('.right .second');
const third = document.querySelector('.right .third');
const fourth = document.querySelector('.right .fourth');

const uppercaseChecked = document.getElementById('uppercase');
const lowercaseChecked = document.getElementById('lowercase');
const numbersChecked = document.getElementById('numbers');
const symbolsChecked = document.getElementById('symbols');

const passwordDisplay = document.querySelector('.password');



const generate = document.getElementById('generate')


const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&*()_+=-[]{}|;:,.<>?";


const tooweak = () => {
    first.classList.add('too-weak')
}

const weak = () => {
    first.classList.add('weak')
    second.classList.add('weak')
}

const medium = () => {
    first.classList.add('medium');
    second.classList.add('medium');
    third.classList.add('medium');
}

const strong =() => {
    first.classList.add('strong');
    second.classList.add('strong');
    third.classList.add('strong');
    fourth.classList.add('strong');
}

output.innerHTML = slider.value;


slider.oninput = function () {
    output.innerHTML = this.value;
    passwordLength = this.value;
    updateSliderTrackColor();
    
}

function updateSliderTrackColor() {
    let value = (slider.value - slider.min) / (slider.max - slider.min) * 100;
    slider.style.background = 'linear-gradient(to right, rgba(164, 255, 175, 1) ' + value + '%, rgba(24, 23, 31, 1) ' + value + '%)';
}


const generatePassword = (length,includeUppercase,includeLowercase,includeNumbers,includeSymbols) => {
    let characters = '';
    let password = '';

    if (includeUppercase) {
        characters += uppercaseLetters;
    }

    if(includeLowercase) {
        characters += lowercaseLetters;
    }

    if(includeNumbers) {
        characters += numbers;
    }

    if(includeSymbols) {
        characters += symbols;
    }

    for (let i=0; i< length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters[randomIndex];
    }
    return password;

}

generate.addEventListener('click', ()=> {
    const length = parseInt(passwordLength, 10);
    const includeUppercase = uppercaseChecked.checked;
    const includeLowercase = lowercaseChecked.checked;
    const includeNumbers = numbersChecked.checked;
    const includeSymbols = symbolsChecked.checked;

    const password = generatePassword(length, includeUppercase, includeLowercase, includeNumbers, includeSymbols);
    passwordDisplay.style.opacity = '1';
    passwordDisplay.textContent = password;

    resetStrengthIndicators();

    const characterTypesCount = [includeUppercase, includeLowercase, includeNumbers, includeSymbols].filter(Boolean).length;



    // if (characterTypesCount < 1 || length < 1) {
    //     alert('you have to select at least one or length is less than 1');
    //     passwordDisplay.textContent = 'ERROR';
    // } else if (length < 6) {
    //     tooweak();
    // } else if ((length === 6 || (length === 7 && characterTypesCount < 3)) || (length === 8 && characterTypesCount < 2)) {
    //     weak();
    // } else if ((length === 7 && characterTypesCount === 3) || (length === 8 && characterTypesCount >= 2) || (length >= 9 && length <= 12 && characterTypesCount >= 2)) {
    //     medium();
    // } else if ((length > 12 && characterTypesCount >= 3) || (length >= 8 && length <= 12 && characterTypesCount === 4)) {
    //     strong();
    // }


    if (characterTypesCount < 1 || length < 1) {
        alert('You must select at least one character type and length must be at least 1.');
        passwordDisplay.textContent = 'ERROR';
    } else if (length < 6) {
        tooweak();
    } else if (length >= 6 && length <= 8) {
        if (characterTypesCount === 1) {
            tooweak();
        } else if (characterTypesCount === 2) {
            weak();
        } else if (characterTypesCount === 3) {
            medium();
        } else { // characterTypesCount === 4
            medium();
        }
    } else if (length > 8 && length <= 12) {
        if (characterTypesCount <= 2) {
            weak();
        } else if (characterTypesCount === 3) {
            medium();
        } else { // characterTypesCount === 4
            strong();
        }
    } else { // length > 12
        if (characterTypesCount === 1) {
            weak();
        } else if (characterTypesCount === 2) {
            medium();
        } else { // characterTypesCount >= 3
            strong();
        }
    }
    

    function resetStrengthIndicators() {
        // Reset the classes for all strength indicators
        first.classList.remove('too-weak', 'weak', 'medium', 'strong');
        second.classList.remove('weak', 'medium', 'strong');
        third.classList.remove('medium', 'strong');
        fourth.classList.remove('strong');
    }
})

