const lis = document.querySelectorAll('li')
const ul = document.querySelector('ul')
const roundshtml = document.querySelector('.rounds')
let rounds = 0
let iaSequence = []
let correctColor = 0

function nextRound(){
    rounds++
    roundshtml.innerText = "Rounds: "+rounds
    //ul.classList.add('no-click')

    const randomColor = getRandomColor()
    iaSequence.push(randomColor)
    playRound()

    setTimeout(function(){
        humanPlay()
    },rounds * 600 + 1000)
}

function humanPlay(){
    ul.classList.remove('no-click')
}

function getRandomColor(){
    let colors = ['red', 'green', 'blue', 'yellow']	
    let randomColor = colors[Math.floor(Math.random() * colors.length)]
    return randomColor
}

function activateColor(color){
    const colorElement = document.querySelector('.' + color)
    colorElement.classList.add('activate')
    setTimeout(function(){
        colorElement.classList.remove('activate')
    }, 500)
}

function playRound(){
    iaSequence.forEach(function(color, index){
        setTimeout(function(){
        activateColor(color)
        console.log(iaSequence)
        }, 600 * (index+1))
    })
}

function handleClick(color){

    if(color === iaSequence[correctColor]){
        correctColor++
    }else{
        const div = document.createElement('div')
        const span = document.createElement('span')
        const button = document.createElement('button')
        const body = document.querySelector('body')

        div.classList.add('game-over')
        span.innerText = "You lost"
        button.innerText = "Restart"   
        button.addEventListener('click', function(){
            location.reload()
        }) 
        div.appendChild(span)
        div.appendChild(button)

        body.appendChild(div)
        ul.classList.add('no-click')
        correctColor = 0
        iaSequence = []
        
    }

    if(correctColor === rounds){
        correctColor = 0
        ul.classList.add('no-click')
        setTimeout(function(){
            nextRound()
        },1000)
    }
}

document.addEventListener('DOMContentLoaded', function(){
    nextRound()
    for(let i = 0; i<lis.length; i++){
        lis[i].addEventListener('click', function(){
            handleClick(this.classList.value)
        })
    }
})