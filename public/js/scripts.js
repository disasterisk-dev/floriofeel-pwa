var highlighted = "Rose";

function back() {
    window.history.back();
}

function show(target) {
    switch (target) {
        case "main":
            document.getElementById("main").style.display = 'block';
            document.getElementById("in").style.display = 'none';
            document.getElementById("up").style.display = 'none';
            break;
        case "in":
            document.getElementById("in").style.display = 'block';
            document.getElementById("main").style.display = 'none';
            document.getElementById("up").style.display = 'none';
            break;
        case "up":
            document.getElementById("up").style.display = 'block';
            document.getElementById("in").style.display = 'none';
            document.getElementById("main").style.display = 'none';
            break;

    }

}