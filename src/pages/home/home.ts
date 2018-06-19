import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  hidden:string="";
  op:string="";
  // opExpr:any;
  showOp:any;
  operator:any;
  mathOp:any;
  specialOp:any;
  swiped:boolean=false;
  opArray1:string[]=["/","*","+","-","^"];
  opArray2:string[]=["\u221A","sin","cos","tan","ln"];
  numbExp:any;
  constructor(public navCtrl: NavController) {
    // this.opExpr=/(\d*)((\+|\-|\*|\*\*|\/|sqrt\(|sin\(|cos\(|tan\(|log\()(\d+\)?))+$/gm;
    this.mathOp=/(sqrt|sin|cos|tan|log)/g;
    this.numbExp=/\d/;
    this.showOp=/\+|\-|\*|\/|\*\*/
    this.operator=/\+|\-|\*|\*\*|\/|\*\*|\^/;
    this.specialOp=/\^|ln|\u221A|x/;
  }

  uniq=(a)=>{
    return Array.from(new Set(a));
  }

  onSwipe=()=>{
    this.swiped=!this.swiped;
  }


  print = (e) =>{
    let lastNumb =this.op.split(this.operator)[this.op.split(this.operator).length-1]
    let reg = new RegExp(lastNumb+"$")
    console.log(this.numbExp.test(this.op[this.op.length-1]));
      if(this.mathOp.test(e)){
        console.log(this.op.split(this.operator))
        // console.log(this.numbExp.test(this.op[this.op.length-1]));
        if(this.numbExp.test(this.op[this.op.length-1])){
          
          this.hidden =this.hidden.replace(reg,`Math.${e}(${lastNumb})`);
          this.op =this.op.replace(reg,`${e}(${lastNumb})`);
          this.op=this.op.replace(/\s/,"");
          console.log(this.hidden);
        }else{return;
          }
      }else if(this.numbExp.test(e)||this.showOp.test(e)||e=="."){
        console.log("entered number or operator zone of else");
        
        this.op+=e;
        this.op=this.op.replace(/\s/,"");
        this.hidden+=e;
        
      }else if(this.specialOp.test(e)){
        switch(e){
          case "ln":
          if(this.numbExp.test(this.op[this.op.length-1])){
           
          this.hidden =this.hidden.replace(reg,`Math.log(${lastNumb})`);
          this.op =this.op.replace(reg,`${e}(${lastNumb})`);}
          break;
          case "^":
                this.hidden+="**";
                this.op+=e;
                this.op=this.op.replace(/\s/,"");
          break;

          case "\u221A":
          if(this.numbExp.test(this.op[this.op.length-1])){
          this.hidden =this.hidden.replace(reg,`Math.sqrt(${lastNumb})`);
          this.op =this.op.replace(reg,`${e}(${lastNumb})`);
          this.op=this.op.replace(/\s/,"");}
          break;
        }
      }
      console.log("current operation: "+this.op);
        console.log("current hidden operation: "+this.hidden);
        
    console.log(this.op+"   ///   "+this.op.split(this.operator))
     
  }

  operate =(operation)=>{
    try{
        operation=operation.replace(/\s/,"");
        this.op =eval(operation).toString();
        this.hidden=eval(operation).toString();
        console.log("current operation: "+this.op);
        console.log("current hidden operation: "+this.hidden);
    }catch(err){
      console.log(err);
      this.op="SYNTAX ERROR";
      this.hidden="";
    }
  }

  delete=()=>{
    let lastNumb =this.op.split(this.operator)[this.op.split(this.operator).length-1]
    if(this.mathOp.test(lastNumb)||this.op[this.op.length-1]==")"){
      this.op=this.op.replace(lastNumb,"");
      this.hidden=this.hidden.replace(lastNumb,"");
      this.hidden=this.hidden.replace("Math.","");
    }else{
    this.op= this.op.slice(0,-1);
    this.hidden= this.hidden.slice(0,-1);}
    console.log("current operation: "+this.op);
      console.log("current hidden operation: "+this.hidden);
  }


  erase=()=>{
    this.op="";
    this.hidden="";
    console.log("current operation: "+this.op);
      console.log("current hidden operation: "+this.hidden);
  }

}


// let input=document.getElementById('input');
// let res=document.getElementById('res');
// let regexp=document.getElementById('regexp');
// const opExpr=/(\d*)((\+|\-|\*|\*\*|\/|sqrt\(|sin\(|cos\(|tan\(|log\()(\d*\)?))+$/gm;
// const mathOp=/(sqrt\(|sin\(|cos\(|tan\(|log\()/g;
// const handleChange=()=>{
    
        
//     res.innerHTML=input.value;
//     }
//     const uniq = a => {
//         return Array.from(new Set(a));
//         }

// const operar =()=>{
    
//     regexp.innerHTML=opExpr.test(input.value)+'    '+mathOp.test(input.value);

//     try{
//         console.log(input.value)
//         console.log(input.value.match(opExpr))

//     if(opExpr.test(input.value)){

//         if(mathOp.test(input.value)){
//             let i=input.value;
//             console.log(i.match(mathOp));
//             let spArray=uniq(i.match(mathOp));
//             spArray.map((op)=>{
//                 const opmod=op.replace("(","\\(");
//                 console.log(spArray);
//                 const re = new RegExp(opmod,"g");
//                 i=i.replace(re,`Math.${op}`);
//                 console.log(i);
//             });
            
//             console.log(i);
//             res.innerHTML=eval(i);
//         }else{
//         res.innerHTML=eval(input.value);
//         }}else{res.innerHTML="operacion invalida"
//         }
        
//     }catch(e){
//         res.innerHTML="operacion invalida";
//     }
// }

