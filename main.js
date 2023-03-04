
// All the data load from this function
const loadAllData = (dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    fetch(url)
        .then(res => res.json())
        .then(data => showCardData(data.data.tools , dataLimit))

          // start loader
        loaderSpninner(true);

          
}
// display card function from here
const showCardData = (cards , dataLimit) => {

    // document.getElementById('sort-btn').addEventListener('click',function(){

    //     cards.sort= (a,b) => (a.published_in - b.published_in

    //         );

    // })
    // console.log(cards)



    const cardContainer = document.getElementById('card-container');
    cardContainer.textContent = ' ';

    const seeMore = document.getElementById('see-more');
    if ( dataLimit && cards.length > 6) {
        cards = cards.slice(0, 6);
        
        seeMore.classList.remove('d-none');
    }
    else{
        seeMore.classList.add('d-none');
    }



    for (let card of cards) {
    
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `

        
        <div class="card h-100 p-3">
        <img src=${card.image} class="card-img-top   " alt="...">
        <div class="card-body">
          <h5 class="card-title">Features</h5>
         
          <ol>
          
          ${card.features.length ? card.features.map( featureTitle => `<li> ${featureTitle}</li>` ).join(''): "<li class='d-none'> </li>" 
        }
         
          </ol>
          
        </div>
        <hr>
        <div class=" d-flex justify-content-between align-items-center">
         <div>
         <h5>${card.name}</h5>
         <p clas=""> <i class="far fa-calendar-alt"></i>  ${card.published_in}</p>
         </div>
         <i class= "fas fa-arrow-right text-danger" data-bs-toggle="modal" data-bs-target="#cardModal" data-bs-toggle="modal" data-bs-target="#cardModal" onclick =" fetchModalDetails('${card.id}')"></i>

        </div>
      </div>
      

        `;
        cardContainer.appendChild(div);

    }
    // stop loader
    loaderSpninner(false);

}

const fetchModalDetails = (card_id) => {

    // console.log(card_id)
    const url = `https://openapi.programming-hero.com/api/ai/tool/${card_id}`;

    fetch(url)
        .then(res => res.json())
        .then(data => showModalDetails(data.data))
}

// modal body
const showModalDetails = modal => {

    console.log(modal.input_output_examples)

    const modalCards = document.getElementById('modal-body');
    
     modalCards.innerHTML = `

    
         <div class="  card p-3 bg-danger-subtle border border-danger" style="width: 22rem;">
                
            <div class="card-body p-4  ">
            <div><h5 class="">${modal.description}</h5></div>

            <div class =" d-flex gap-2 justify-content-center ">
                <div class="bg-white px-2  rounded  text-center text-success fw-semibold d-flex align-items-center"><p>${modal.pricing[0]?modal.pricing[0].price + "<br>" + modal.pricing[0].plan:'Free of cost' }</p></div>

                <div class="bg-white px-2 rounded   text-center text-warning fw-semibold  d-flex align-items-center"><p>${modal.pricing[1]?modal.pricing[1].price + "<br>" + modal.pricing[1].plan:'Free of cost' }</p></div>

                <div class="bg-white px-2 rounded   text-center text-danger fw-semibold d-flex align-items-center"><p>${modal.pricing[2]?modal.pricing[2].price + "<br>" + modal.pricing[2].plan:'Free of cost' }</p></div>
            
           </div>

            <div class="d-flex justify-content-between mt-4">
                <div >
                <h5>Features</h5>
                        <ul class="px-4">
                        <li>${modal.features[1].feature_name}</li>
                        <li>${modal.features[2].feature_name}</li>
                        <li>${modal.features[3].feature_name}</li>

                        
                            
                        </ul>
                </div>

                <div>
                <h5>Integrations</h5>
                
                <ul class="px-4">

                   ${modal.integrations.length ? modal.integrations.map( integration => `<li> ${integration}</li>` ).join(''): "<li>Not Data Found </li>" 
                }
                    
                 </ul>
                
                </div>
            </div>

            </div>
            </div> 


            <div class="  card p-3" style="width: 22rem;">
                    <div>
                    <img src="${modal.image_link[0]}" class="card-img-top position-relative" alt="...">
                    <h5> <span class="badge bg-danger position-absolute top-0 end-0 mt-4 me-4 p-2">${modal.accuracy.score? modal.accuracy.score *100: 'd-none'}% Accurecy</span></h5>

                    </div
            <div class="card-body mt-4">

            <h6 class="text-center mt-4"> ${modal.input_output_examples !== null? modal.input_output_examples[0].input:  'No Not Yet text ' }</h6>
            <p class="text-center mt-4"> ${modal.input_output_examples !== null? modal.input_output_examples[0].output: `No Not Yet text`  }</p>
       
            </div>
            </div> 
    `;
 


}
// spninner loding
const loaderSpninner = isLoading =>{
    const loaderSection = document.getElementById('loader');
    if(isLoading){
        loaderSection.classList.remove('d-none');
    }
    else{
        loaderSection.classList.add('d-none');

    }
}


//  button see more
document.getElementById('seeMore-btn').addEventListener('click',function(){
  
    
    loadAllData();

})

 function sortDate(){
    loadAllData();

}





loadAllData(6);