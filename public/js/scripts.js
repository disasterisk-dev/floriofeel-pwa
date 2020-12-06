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

function highlight(id) {


    document.getElementById(highlighted).style.border = "none";
    document.getElementById(id).style.border = "thin solid #403038";
    highlighted = id;

    document.getElementById("name").textContent = id;

    switch (id) {
        case "Rose":
            document.getElementById("desc").textContent = "Mmm smells good";
            break;
        case "Thorn":
            document.getElementById("desc").textContent = "Oof ouch pointy";
            break;
        default:
            document.getElementById("desc").textContent = "...";
    }

    document.getElementById("proceed").classList.remove("disabled");

}