const n=8;
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

const arrOfNumb = randomNumbers()
for (let i = 1; i <= n; i++) {
    for (let k = 1; k <= n; k++) {
        const cell = document.createElement('div');
        const inCell = document.createElement('div');
        cell.setAttribute('class','cell');
        cell.setAttribute('id','c'+i+'-'+k);
        inCell.setAttribute('class','inCell');
        if(k==n&&i==n){
            cell.classList.add('void');
        }else{
            inCell.innerText=arrOfNumb[((i-1)*3+k)-1];
        }
        field.append(cell);
        cell.append(inCell);
    }
}
document.body.append(field);
let res = true;
document.getElementsByClassName('field')[0].addEventListener('mousedown',(e)=>{
    var cell=e.target.classList.contains('inCell')?e.target.parentElement:false;
    if(cell){
        if(res){
            res=false;
            setTimeout(()=>{res=true},200)
            tryToMove(cell);
        }//else{cell.shake()}
    }
})
function tryToMove(cell){
    let targetCell = new Cell(cell);
    if(Math.abs(targetCell.inColumn())==1){
        targetCell.replace(targetCell.inColumn(),"Y");
    }
    if(Math.abs(targetCell.inRow())==1){
        targetCell.replace(targetCell.inRow(),"X");
    }
}
class Cell{
    constructor(cell){
        this.cell = cell;
        this.col = cell.id[1];
        this.row = cell.id[3];
        this.voidCell = document.getElementsByClassName('void')[0];
    }
    inRow(){
        return  this.voidCell.id[3]==this.row?
                this.voidCell.id[1]-this.col:
                false
    }
    inColumn(){
        return  this.voidCell.id[1]==this.col?
                this.voidCell.id[3]-this.row:
                false
    }
    replace(diff,direction){
        let id;
        let move=diff==1?(100):-100;
        this.cell.classList.add('a');
        this.cell.style = " transform: translate"+direction+"("+move+"%)"
        setTimeout(()=>{
            this.cell.classList.remove('a');
            this.cell.style.transform = "none";
            id=this.cell.id;
            this.cell.id=this.voidCell.id;
            this.voidCell.id=id;
        },200)
    }
}
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