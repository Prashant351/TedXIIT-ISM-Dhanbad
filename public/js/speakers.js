var slideIndex = 1;
showDivs(slideIndex);
function plusDivs(n) {
    showDivs(slideIndex += n);
}
function showDivs(n) {
    var i;
    var x = document.getElementsByClassName("speakers-gallery");
    if (n > x.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = x.length }
    document.getElementById("speakers-display-1").src = x[slideIndex - 1].src;
}
function abc(a) {
    document.getElementById("speakers-display-1").src = document.getElementById(a).src;
}