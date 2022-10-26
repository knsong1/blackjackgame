import conffeti from 'https://cdn.skypack.dev/canvas-confetti';

function party() {
    conffeti();
}

document.getElementById("conffeti").addEventListener("click", party);
