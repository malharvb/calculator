// These are flag variables to stop opertaions and equals to sign 
let c2 = 0, c3 = 1;
//this array is used to sote the 2 operands
let dispCont = [];
//this takes the individual number
let no = '';
//this flag is used to say that an operation has been performed
let operated_now = 0;
let d = '';
//this is for getting calculations suchas .2*.1 correct
let cf = 10;

function add(a,b)
{
    return a+b;
}
function sub(a,b)
{
    return (a-b);
}
function mult(a,b)
{
    return (a * cf) * (b * cf) / (cf * cf);
}
function div(a,b)
{
    return (a/b).toFixed(4);
}


function operate(a,b,op)
{
    if(op == 'add')
        disp.textContent = add(a,b);
    else if(op == 'sub')
        disp.textContent = sub(a,b);
    else if(op == 'mult')
        disp.textContent = mult(a,b);
    else if(op == 'div')
    {
        if(b == 0)
        {
            disp.textContent = 'Really?';
            opbtns.forEach(btn=>btn.disabled = true);
        
        }
        else
        {
            disp.textContent = div(a,b);
        }
    }
    if(disp.textContent != 'Really?')
    {
        disp.textContent = Math.round(parseFloat((disp.textContent * Math.pow(10, 2)).toFixed(2))) / Math.pow(10, 2);
    }
    dispCont.length = 0;
    dispCont.push(disp.textContent);
    //console.log(dispCont)
    no = '';
    operated_now++;
}
//this container is for display of calculator
let disp = document.querySelector('.display');
//this container is to access all the buttons on the page
let btns = document.querySelectorAll('button');
//this container is for the AC button
let clear = document.querySelector('.AC');
btns.forEach(btn => btn.addEventListener('click', popDisp));
let dot = document.querySelector('#dot');
let opbtns = document.querySelectorAll('.operators');
let numbtns = document.querySelectorAll('.numbers');


function popDisp(e)
{    
    if(e.target.className == 'numbers')
    {
        let c1 = 0;
        //console.log(no.length);
        if(no.length >= 9)
        {
            c1 = 1;
        }
        else
        {
            c1 = 0;
        }
        
        opbtns.forEach(btn=>btn.disabled = false);
        //this logic enters the input on the screen and also stores the first number
        if(c1 == 0)
        {
            disp.textContent += e.target.textContent;
            no += e.target.textContent;
        }
        //console.log(dispCont)
        //this condition is executed when an operation has just been performed
        if(operated_now > 0)
        {
            //if an operation is justed completed and number is entered reset everything
            disp.textContent = '';
            c2 = 0;
            c3 = 0;
            op = '';
            no = '';
            dispCont.length = 0;
            operated_now--;
            disp.textContent += e.target.textContent;
            no += e.target.textContent;
        }
    }
    else if(e.target.className == 'operators' && disp.textContent != '' && c2 == 0)
    {   
        //this condition stores the number variable in the dispContent array
        if(no != '' && dispCont.length != 1)
        {
            dispCont.push(no);
            no = '';
            console.log(no.length)
        }
        dot.disabled = false;
        disp.textContent += e.target.textContent; 
        c2++;
        op = e.target.id;
        //console.log(dispCont)
        c3 = 0;
        operated_now = 0;
        
        

        
        //console.log(dispCont +' ' + op)
    }//this is when equals i pressed to calculate
    else if(e.target.className == 'equals' && c3 == 0)
    {
        if(dispCont.length != 0)
        {
            dispCont.push(no);
            no = '';
            if(dispCont[0] == '' || dispCont[1] == '')
                dispCont.pop();

            if(dispCont.length == 2 && dispCont[1] != '')
            {
                c3++;
                operate(parseFloat(dispCont[0]),parseFloat(dispCont[1]),op);
                c2 = 0;
                op = '';
                dot.disabled = false; 
                
            }
        }
    }//this is to reset everything
    else if(e.target.className == 'AC')
    {
        disp.textContent = '';
        c2 = 0;
        c3 = 0;
        op = '';
        no = '';
        dispCont.length = 0;
        btns.forEach(btn => btn.disabled = false);
    }
    //this is to allow equals to pressed only when 2 nos have been entered
    if(dispCont.length == 2)
    {
        c3 = 0;
    }
    //this is for when after entering 2 numbers another operator is clicked
    if(no != '' && dispCont.length == 1 && e.target.className == 'operators')
    {
        
        dispCont.push(no);
        no = '';
        c3 == 0;
        
        operate(parseFloat(dispCont[0]),parseFloat(dispCont[1]),op);

        if(disp.textContent != 'Really?')
        {
            disp.textContent += e.target.textContent; 
            operated_now = 0;
            op = e.target.id;
            dot.disabled = false;
        }

    }    

    if(e.target.id == 'dot')
    {
        dot.disabled = true;
    } 


    if(e.target.className == 'back' && disp.textContent != '' && disp.textContent != 'Really?')
    {
        console.log(dispCont);
        
        s = disp.textContent.slice(-1);
        disp.textContent = disp.textContent.slice(0,-1)
        //tp is temp array to find current state of Display on calculator as i have used push and pop based on operators in arithematic operations

        if(op == '' && dispCont.length == 1)
        {
            tp = [];
            tp = disp.textContent.split(/[\+\-\u00f7\u00d7]/);
            console.log(tp);
            if(tp[1] == '')
            {
                tp.pop();
            }
            dispCont = tp;
            console.log('new logic' + dispCont);
        }
        else if(s != '' )
        {
            if(s == '\u00f7' || s == '\u00d7' || s == '+' || s == '-')
            {
                c2 = 0;
                op = ''
                no = ''
            }
            else if(s == '.')
            {
                dot.disabled = false;
            }
            else
            {
                no = no.slice(0,-1);
            }
        }

        if(dispCont[1] == '' || dispCont[0] == '')
        {
            dispCont.pop();
        }
    }

            
        
    
    
}