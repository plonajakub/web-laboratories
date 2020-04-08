window.onload = () => {
    // Hooks for the events
    document.getElementById("link-google").addEventListener("mouseover", (event) => {
        document.getElementById("cat-img").src = "img/cat2.svg";
    });

    document.getElementById("link-google").addEventListener("mouseout", (event) => {
        document.getElementById("cat-img").src = "img/cat1.svg";
    });
};
