const n=3;
function gridTamplate(n){
    let str="";
    for (let i = 0; i < n; i++) {
        str+="1fr, "
    }
    return str.substring(0,str.length-2)+"; ";
} 
console.log(gridTamplate(n))
var block = document.createElement('div');
block.setAttribute("class","block");
block.setAttribute("style",
    "grid-template-columns: "+gridTamplate(n)+
    "grid-template-rows: "+gridTamplate(n)
);

for (let i = 1; i < n+1; i++) {
    for (let k = 1; k < n+1; k++) {
        const cell = document.createElement('div');
        cell.setAttribute('class','cell');
        cell.setAttribute('id','c'+i+'-'+k);
        block.append(cell);
        console.log('here');
    }
}
document.body.append(block);
//=====================Анимация
// const block = document.getElementsByClassName('block')[0];
// block.addEventListener('mousedown',(e)=>{
//     e.target.classList.add('a');
//     e.target.style = " transform: translateX(100%)"
//     setTimeout(()=>{
//         e.target.classList.remove('a');
//         e.target.style.transform = "none";
//         e.target.style = "grid-area:1/2/2/3"
//     },500)
// });