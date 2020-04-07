
window.onload=()=>{
    startGame(document.getElementsByClassName('info__type')[0].value)
    sizeCorrection();
    timerBoard();
}
window.onresize = ()=>{
    sizeCorrection();

}
let timer = false;
let save = false;
let moveCounter = 0;
let timeCounter = 0;
function startGame(n){
    const gemField = new Field(n);
    gemField.create();
    moveCells(gemField);
    moveCounter = 0;
    timeCounter = 0;
    timer = false;
}
function timerBoard(){
    
    setInterval(()=>{
        if(timer){
            timeCounter++;
            document.getElementsByClassName('info__time-count')[0].innerText = timeCounter
        }
    },1000);
    
}
function progressBlockToDef(){
    save=false;
    document.getElementsByClassName('info__save')[0].style = "transform:none"
    document.getElementsByClassName('info__save')[0].innerText="PUSH"
    document.getElementsByClassName('info__percentage')[0].style = "transform:none"
}
function moveCells(gem){
    let res = true;
    document.getElementsByClassName('info__type')[0].addEventListener('change',(e)=>{
        const value = document.getElementsByClassName('info__type')[0].value;
        if(value==8){
            document.getElementById('game').style = "font-size:30px"
        }
        startGame(value)
    })
    document.getElementsByClassName('info')[0].addEventListener('mousedown',(e)=>{
        
        if(e.target.classList.contains('info__stop')){
            timer = false;
        }
        if(e.target.classList.contains('info__save')){
            if(!save){
                save=true;
                e.target.innerText="SAVE"
                e.target.style = "transform:translateX(-105%)"
                document.getElementsByClassName('info__percentage')[0].style = "transform:translateX(105%)"
            }else
            if(save){
                alert('Saved');
                localStorage.setItem('checkpoint',document.getElementsByClassName('info__type')[0].value+"$"+
                timeCounter+"$"+
                moveCounter+"$"+
                gem.currentValues().join())
                console.log(localStorage.getItem('checkpoint'))
            }
        }
    })
    
    document.getElementsByClassName('info')[0].addEventListener('mouseleave',()=>{
        progressBlockToDef()
    })
    document.getElementsByClassName('field')[0].addEventListener('mousedown',(e)=>{
    e.preventDefault();
    var cell=e.target.classList.contains('inCell')||
    e.target.classList.contains('error')?
    e.target.parentElement:
    false;
    if(cell){
        if(res){
            res=false;
            timer=true;
            setTimeout(()=>{res=true;},100)
            setTimeout(()=>{document.getElementsByClassName('info__percentage')[0].innerText = gem.percentageComplete();},200);
            const targetCell = new Cell(cell);
            targetCell.tryToMove();
            
        }
    }
})
}
function sizeCorrection(){
    document.getElementsByClassName('info')[0].setAttribute("style","width:"+document.getElementsByClassName('field')[0].offsetWidth+"px")
}
class Field{
    constructor(n){
        this.n = n;
    }
    gridTamplate(n){
        let str="";
        for (let i = 0; i < n; i++) {
            str+="1fr "
        }
        return str+"; ";
    }
    randomNumbers(){
        var arr=[];
        var i2;
        var sub;
        for (let i = 0; i < Math.pow(this.n,2)-1; i++) {
            arr.unshift(i+1);
            i2=Math.floor(Math.random()*(i + 1));
            sub = arr[i2];
            arr[i2]=arr[0];
            arr[0]=sub;
        }
        return arr;
    }
    fillUp(field,arrOfNumb){
        
        for (let col = 1; col <= this.n; col++) {
             for (let row = 1; row <= this.n; row++) {
                const cell = document.createElement('div');
                const inCell = document.createElement('div');
                cell.setAttribute('class','cell');
                cell.setAttribute('id','c'+row+'-'+col);
                inCell.setAttribute('class','inCell');
                if(row==this.n&&col==this.n){
                    cell.classList.add('void');
                }else{
                    inCell.innerText=arrOfNumb[((col-1)*this.n+row)-1];
                }
                    cell.append(inCell);
                    field.append(cell);
                
            }
        }
    }
    create(){
        if(document.getElementsByClassName('field')[0]){
            document.getElementsByClassName('field')[0].remove();
        }
        const field = document.createElement('div');
        field.setAttribute("class","field");
        field.setAttribute("style",
            "grid-template-columns: "+this.gridTamplate(this.n)+
            "grid-template-rows: "+this.gridTamplate(this.n)
        );
        this.fillUp(field,this.randomNumbers())
        document.getElementById('game').append(field);
        
    }
    currentValues(){
        let values = [];
        for (let row = 1; row <= this.n ; row++) {
            for (let col = 1; col <= this.n ; col++) {
                values.push(document.getElementById('c'+col+"-"+row).innerText)
            }
        }
        
        return values;
    }
    percentageComplete(){
        const values = this.currentValues();
        let percent = 0;
        const step = 100/(Math.pow(this.n,2)-1);
        for (let i = 0; i < values.length; i++) {
            if(values[i]!=i+1){break}
            else{percent+=step;}
        }
        return percent.toString().substring(0,4)+"%"
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
    tryToMove(){
        if(Math.abs(this.inColumn())==1){
            this.replace(this.inColumn(),"Y");
        }else
        if(Math.abs(this.inRow())==1){
            this.replace(this.inRow(),"X");
        }else 
        if(!this.cell.classList.contains('void')){
            this.wrongCell();
        }

    }
    wrongCell(){
        const err  = document.createElement('div');
        err.setAttribute('class','error a2');
        setTimeout(()=>{err.style.opacity = 1},20)
        setTimeout(()=>{err.style.opacity = 0},500)
        
        this.cell.append(err);
        setTimeout(()=>{err.remove()},900)
    }
    replace(diff,direction){
        this.newMove();
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
        },100)
    }
    newMove(){
        moveCounter++;
        document.getElementsByClassName('info__move')[0].innerText = moveCounter;
    }
}