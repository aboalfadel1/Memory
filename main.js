document.querySelector(".control-buttons span").onclick = () => {
    let yourName = prompt("What is your name ?")
    yourName = yourName || "Unknown"
    document.querySelector(".name span").innerHTML = yourName
    document.querySelector(".control-buttons").remove();
    document.getElementById("start").play()
}
let duration = 1000
let blocksContainer = document.querySelector(".memory-game-blocks")
let blocks = Array.from(blocksContainer.children)
let orderRang = [...Array(blocks.length).keys()];
orderRang=schuffelArray(orderRang)
blocks.forEach((block, index) => {
    block.style.order = orderRang[index];
    block.addEventListener('click',()=>{
        block.classList.add("is-flipped")
        matchFlipped(blocks)
        

    })


})

function schuffelArray(arr){
    let temp,current=arr.length,random
    while(current>0){
        random=Math.floor(Math.random()*current)
        current --
        temp=arr[current]
        arr[current]=arr[random]
        arr[random]=temp
    }
    return arr;
}
function matchFlipped(arr){
    let nueArr=arr.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'))
    if(nueArr.length===2){
        console.log("two elememnt filpped")
        stopClicking();
        checkMatchedBlocks(nueArr[0],nueArr[1])

    }
}
function stopClicking(){
    blocksContainer.classList.add("no-clicking")
    setTimeout(() => {
        blocksContainer.classList.remove("no-clicking")
    }, duration);
}
function checkMatchedBlocks(firstBlock,secBlock){
let triesElement=document.querySelector(".tries span")
if(firstBlock.dataset.block === secBlock.dataset.block){
    firstBlock.classList.remove('is-flipped')
    secBlock.classList.remove('is-flipped')
    firstBlock.classList.add('has-matched')
    secBlock.classList.add('has-matched')
    document.getElementById("success").play();
}
else{
    triesElement.innerHTML=parseInt(triesElement.innerHTML)+1; 
    document.getElementById("faild").play();    
    setTimeout(() => {
        firstBlock.classList.remove('is-flipped')
    secBlock.classList.remove('is-flipped')
    }, duration);
}
}