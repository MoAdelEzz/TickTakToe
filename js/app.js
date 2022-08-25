let Player = 1;
let ignoreInput = false;
let cnt = 0;
let cellChoosed = 0;
let Winner = ""

let P1 = 0;
let P2 = 0;
let Tie = 0;


let gameFinished = false;

// ========================================================================

function printResult()
{
    let x = document.getElementsByClassName('Score')[0];
    x.innerHTML = "<p>"+"7ambola         " + " VS " + '\t \t' + "         Z3bola         " + "</p>";
    x.innerHTML += "<p>"+ P1 + '\t \t' + Tie + '\t \t' + P2 + "</p>";
}

function ChangeColor(a, b, c, winner)
{
    for (let i = 1 ; i <= 9 ; i++)
    {
        switch(i)
        {
            case a: case b : case c :

            document.getElementById(i).getElementsByTagName('span')[0].classList.remove(winner);

            document.getElementById(i).getElementsByTagName('span')[0].classList.add('winEffect');
            break;

            default:
                if (document.getElementById(i).getElementsByTagName('span').length)
                {
                    document.getElementById(i).getElementsByTagName('span')[0].style.color = "gray";
                }
            break;
        }

    }
    if (!gameFinished)
    {
        switch(Winner)
        {
            case "x" : P1++; break;
            case "o" : P2++; break;
            case "t" : Tie++; break;
        }
        printResult();
        gameFinished = true;
    }

}


function positionCheck(a,b,c)
{
    x = document.getElementById(a).innerText;
    y = document.getElementById(b).innerText;
    z = document.getElementById(c).innerText;

    if (x == y && y == z && x != "")
    {
        if (document.getElementById(a).getElementsByClassName('x').length)
        {
            Winner = "x";
        }
        else
        {
            Winner = "o";
        }
        
        ignoreInput = true;

        cellChoosed = 0;

        ChangeColor(a,b,c, Winner);
        return true;
    }
    return false;
}

function checkEndGame()
{
    for (let i = 0; i < 3 ; i++)
    {
        if(positionCheck((i*3) + 3, (i*3) + 2, (i*3) + 1))
        {
            return true;
        }
    }

    for (let j = 0 ; j < 3 ; j++)
    {
        if(positionCheck(j + 1, j + 4, j + 7))
        {
            return true;
        }
    }

    if(positionCheck(1, 5, 9))
    {
        return true;
    }

    if(positionCheck(3, 5, 7))
    {
        return true;
    }

    if (cellChoosed == 9)
    {
        ignoreInput = true;
        Winner = "t";
        ChangeColor(-1,-1,-1);
        return true;
    }

    return false;
    
    
}

function place(id)
{

    if (document.getElementById(id).innerHTML != "" || ignoreInput)
        return;


    let xo = "";
    
    if (Player == 1)
    {
        Player = 2;
        xo = "x";
    }
    else
    {
        Player = 1;
        xo = "o";
    }

    cellChoosed++;

    document.getElementById(id).innerHTML = "<span class = \"" + xo +"\" >" + xo.toUpperCase() +"</span>";
}

function Restart()
{
    if (ignoreInput && cnt == 1)
    {
        for (let i = 1 ; i < 10 ; i++)
        {
            document.getElementById(i).innerHTML = "";
        }
        cnt = 0;
        ignoreInput = false;
        Player = 1;
        cellChoosed = 0;
        gameFinished = false;
    }
    else
    {
        if (ignoreInput)
            cnt++;
    }
}






















// -_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- Main App -_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- 
printResult();
for (let i = 0 ; i < 3; i++)
{
    for (let j = 0; j < 3 ; j++)
    {
        let id = (i*3) + j + 1;
        document.getElementById(id).onclick = function()
        {
            place(id);
            if (checkEndGame())
            {
                Restart();
            }

            console.log("P1 " + P1 + " P2 " + P2 + " Tie " + Tie );

        };
    }
}
