
window.onload=()=>{
    const gemField = new Field(4);
    gemField.create();
    moveCells();
}
function moveCells(){
    let res = true;
    document.getElementsByClassName('field')[0].addEventListener('mousedown',(e)=>{
    var cell=e.target.classList.contains('inCell')?e.target.parentElement:false;
    if(cell){
        if(res){
            res=false;
            setTimeout(()=>{res=true},200)
            const targetCell = new Cell(cell);
            targetCell.tryToMove();
        }//else{targetCell.err()}
    }
})
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
        for (let i = 1; i <= this.n; i++) {
            for (let k = 1; k <= this.n; k++) {
                
                const cell = document.createElement('div');
                const inCell = document.createElement('div');
                cell.setAttribute('class','cell');
                cell.setAttribute('id','c'+i+'-'+k);
                inCell.setAttribute('class','inCell');
                if(k==this.n&&i==this.n){
                    cell.classList.add('void');
                }else{
                    inCell.innerText=arrOfNumb[((i-1)*3+k)-1];
                }
                field.append(cell);
                cell.append(inCell);
            }
        }
        
        
    }
    create(){
        const field = document.createElement('div');
        field.setAttribute("class","field");
        field.setAttribute("style",
            "grid-template-columns: "+this.gridTamplate(this.n)+
            "grid-template-rows: "+this.gridTamplate(this.n)
        );
        this.fillUp(field,this.randomNumbers())
        document.body.append(field);
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
        }
        if(Math.abs(this.inRow())==1){
            this.replace(this.inRow(),"X");
        }
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

