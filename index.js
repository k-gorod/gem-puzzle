const n=3;
function gridTamplate(n){
    let str="";
    for (let i = 0; i < n; i++) {
        str+="1fr "
    }
    return str+"; ";
} 
console.log(gridTamplate(n))
var field = document.createElement('div');
field.setAttribute("class","field");
field.setAttribute("style",
    "grid-template-columns: "+gridTamplate(n)+
    "grid-template-rows: "+gridTamplate(n)
);

for (let i = 1; i < n+1; i++) {
    for (let k = 1; k < n+1; k++) {
        const cell = document.createElement('div');
        const inCell = document.createElement('div');
        cell.setAttribute('class','cell');
        cell.setAttribute('id','c'+i+'-'+k);
        inCell.setAttribute('class','inCell');
        field.append(cell);
        cell.append(inCell);
    }
}
document.body.append(field);
//=====================Анимация
// const field = document.getElementsByClassName('field')[0];
// field.addEventListener('mousedown',(e)=>{
//     e.target.classList.add('a');
//     e.target.style = " transform: translateX(100%)"
//     setTimeout(()=>{
//         e.target.classList.remove('a');
//         e.target.style.transform = "none";
//         e.target.style = "grid-area:1/2/2/3"
//     },500)
// });