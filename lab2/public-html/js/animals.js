window.onload = () => {
    const imgLabels = document.getElementsByClassName("menu-item");
    const currentAnimalImage = document.getElementById("curr-animal-img");
    const imgPath = "img/zad3/";
    const imgExt = ".gif";
    for (const imgLabel of imgLabels) {
        imgLabel.addEventListener("mouseover", () => {
           imgLabel.src = imgPath + imgLabel.id + "over" + imgExt;
           currentAnimalImage.src = imgPath + imgLabel.id + imgExt;
        });
        imgLabel.addEventListener("mouseout", () => {
            imgLabel.src = imgPath + imgLabel.id + "out" + imgExt;
            currentAnimalImage.src = "img/white.svg";
        });
    }
};