const n=5;
function gridTamplate(n){
    let str="";
    for (let i = 0; i < n; i++) {
        str+="1fr "
    }
    return str+"; ";
} 
var field = document.createElement('div');
field.setAttribute("class","field");
field.setAttribute("style",
    "grid-template-columns: "+gridTamplate(n)+
    "grid-template-rows: "+gridTamplate(n)
);
function randomNumbers(){
    var arr=[];
    var i2;
    var sub;
	for (let i = 0; i < Math.pow(n,2)-1; i++) {
        arr.unshift(i+1);
        i2=Math.floor(Math.random()*(i + 1));
        sub = arr[i2];
        arr[i2]=arr[0];
        arr[0]=sub;
    }
	return arr;
}
console.log(randomNumbers());
const arrOfNumb = randomNumbers()
for (let i = 1; i <= n; i++) {
    for (let k = 1; k <= n; k++) {
        const cell = document.createElement('div');
        const inCell = document.createElement('div');
        cell.setAttribute('class','cell');
        cell.setAttribute('id','c'+i+'-'+k);
        inCell.setAttribute('class','inCell');
        inCell.innerText=k==n&&i==n?"":arrOfNumb[((i-1)*3+k)-1];
        console.log((i-1)*3+k);
        field.append(cell);
        cell.append(inCell);
    }
}
document.body.append(field);
//=====================Анимация

// document.getElementsByClassName('field')[0].addEventListener('mousedown',(e)=>{
//     e.target.classList.add('a');
//     e.target.style = " transform: translateX(100%)"
//     setTimeout(()=>{
//         e.target.classList.remove('a');
//         e.target.style.transform = "none";
//         e.target.style = "grid-area:1/2/2/3"
//     },500)
// });