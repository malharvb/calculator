// These are flag variables to stop opertaions and equals to sign 
let c2 = c3 = 0;
//this array is used to sote the 2 operands
let dispCont = [];
//this takes the individual number
let no = '';
//this flag is used to say that an operation has been performed
let operated_now = 0;

function add(a,b)
{
    return a+b;
}
function sub(a,b)
{
    return a-b;
}
function mult(a,b)
{
    return a*b;
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
        if(b == 0)
        {
            disp.textContent = 'Really?';
            btns.forEach(btn => btn.disabled = true);
            clear.disabled = false;
        }
        else
        {
            disp.textContent = div(a,b);
        }
    
    dispCont.length = 0;
    dispCont.push(disp.textContent)
    //console.log(dispCont)
    no = ''
    operated_now++;
}
//this container is for display of calculator
let disp = document.querySelector('.display')
//this container is to access all the buttons on the page
let btns = document.querySelectorAll('button');
//this container is for the AC button
let clear = document.querySelector('.AC')
btns.forEach(btn => btn.addEventListener('click', popDisp));

function popDisp(e)
{   
    if(e.target.className == 'numbers')
    {
        //this logic enters the input on the screen and also stores the first number
        disp.textContent += e.target.textContent;
        no += e.target.textContent;
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
        }
        disp.textContent += e.target.textContent; 
        c2++;
        op = e.target.id
        //console.log(dispCont)
        c3 = 0;
        operated_now = 0;

        
        //console.log(dispCont +' ' + op)
    }//this is when equals i pressed to calculate
    else if(e.target.className == 'equals' && c3 == 0)
    {
        dispCont.push(no);
        
        if(dispCont[0] == '' || dispCont[1] == '')
            dispCont.pop();

        if(dispCont.length == 2 && dispCont[1] != '')
        {
            c3++;
            operate(parseFloat(dispCont[0]),parseFloat(dispCont[1]),op);
            c2 = 0;
            op = '';
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
        disp.textContent += e.target.textContent; 
        operated_now = 0;
        op = e.target.id
        

    }    
    
}