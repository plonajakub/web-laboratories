import axios from 'axios';

window.onload = () => {
    main();
};

function main() {
    const newCatButton = document.getElementById('cat-button');
    const catImage = document.getElementById('cat-image');
    setupImage(catImage);
    newCatButton.onclick = () => {
        setupImage(catImage);
    };
}

function setupImage(image) {
    axios.get('https://aws.random.cat/meow')
    .then(function (response) {
        image.src = response.data.file;
    })
    .catch(function (error) {
        console.log(error);
    });
}