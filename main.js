
// All the data load from this function
const loadAllData =(dataLimit) =>{
    const url='https://openapi.programming-hero.com/api/ai/tools' ;
    fetch  (url)
    .then(res => res.json())
    .then(data => showCardData(data.data.tools,dataLimit))
}
// display card function from here
const showCardData = (cards)=>{
    // console.log(cards)
    const cardContainer = document.getElementById('card-container');
   
   
    if( cards.length>6){
        cards = cards.slice(0,6);
    }
    

   

    for(let card of cards){
        
        // console.log(card.image)
        const div = document.createElement('div');
        div.classList.add('col') ;
        div.innerHTML =`
        <div class="card h-100 p-3">
        <img src=${card.image} class="card-img-top   " alt="...">
        <div class="card-body">
          <h5 class="card-title">Features</h5>
         
          <ol>
          <li>${card.features? card.features[0]: " "}</li>
          <li>${card.features? card.features[1]: " "}</li>
          
          <li>${card.features? card.features[2]: " "}</li>
          <li>${card.features? card.features[3]: " "}</li>
         
          </ol>

      
          
        </div>
        <hr>
        <div class=" d-flex justify-content-between align-items-center">
         <div>
         <h5>${card.name}</h5>
         <p clas=""> ${card.published_in}</p>
         </div>
         <i class= "fas fa-arrow-right text-danger" data-bs-toggle="modal" data-bs-target="#cardModal"></i>

        </div>
      </div>
      

        `;
        cardContainer.appendChild(div);

    }


     // see more data 
     const seeMore =(dataLimit)=>{
        const seeMore = document.getElementById('see-more');
        const seeMoreData = seeMore.innerText;
        loadAllData(dataLimit);

        
    }


}

document.getElementById('seeMore-btn').addEventListener('click',function(){
    seeMore();
    
})

loadAllData();