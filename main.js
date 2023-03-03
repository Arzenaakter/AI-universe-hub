
// All the data load from this function
const loadAllData = (dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    fetch(url)
        .then(res => res.json())
        .then(data => showCardData(data.data.tools, dataLimit))
}
// display card function from here
const showCardData = (cards) => {
    // console.log(cards)
    const cardContainer = document.getElementById('card-container');


    if (cards.length > 6) {
        cards = cards.slice(0, 6);
    }



    for (let card of cards) {

        // console.log(card)
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100 p-3">
        <img src=${card.image} class="card-img-top   " alt="...">
        <div class="card-body">
          <h5 class="card-title">Features</h5>
         
          <ol>
          <li>${card.features ? card.features[0] : " "}</li>
          <li>${card.features ? card.features[1] : " "}</li>
          
          <li>${card.features ? card.features[2] : " "}</li>
          <li>${card.features ? card.features[3] : " "}</li>
         
          </ol>

      
          
        </div>
        <hr>
        <div class=" d-flex justify-content-between align-items-center">
         <div>
         <h5>${card.name}</h5>
         <p clas=""> ${card.published_in}</p>
         </div>
         <i class= "fas fa-arrow-right text-danger" data-bs-toggle="modal" data-bs-target="#cardModal" data-bs-toggle="modal" data-bs-target="#cardModal" onclick =" fetchModalDetails('${card.id}')"></i>

        </div>
      </div>
      

        `;
        cardContainer.appendChild(div);

    }

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
    console.log(modal)
    const modalCards = document.getElementById('modal-body');
    modalCards.innerHTML = `

    
             <div class="  card p-3 bg-danger-subtle border border-danger" style="width: 22rem;">
                 <div><h5>${modal.description}</h5></div>
            <div class="card-body p-4  ">

            <div class =" d-flex gap-2 justify-content-center ">
                <div class="bg-white px-2  rounded  text-center text-success fw-semibold d-flex align-items-center"><p>${modal.pricing[0]?modal.pricing[0].price + "<br>" + modal.pricing[0].plan:'Free of cost' }</p></div>

                <div class="bg-white px-2 rounded   text-center text-warning fw-semibold  d-flex align-items-center"><p>${modal.pricing[1]?modal.pricing[1].price + "<br>" + modal.pricing[1].plan:'Free of cost' }</p></div>

                <div class="bg-white px-2 rounded   text-center text-danger fw-semibold d-flex align-items-center"><p>${modal.pricing[2]?modal.pricing[2].price + "<br>" + modal.pricing[2].plan:'Free of cost' }</p></div>
            
           </div>

            <div class="d-flex justify-content-between mt-4">
                <div >
                <h5>Features</h5>
                        <ul class="px-4">
                            <li >${modal.features[1].feature_name}</li>
                            <li>${modal.features[2].feature_name}</li>
                            <li>${modal.features[3].feature_name}</li>
                            
                        </ul>
                </div>

                <div>
                <h5>Integrations</h5>
                
                <ul class="px-4">
                <li >${modal.integrations[0]}</li>
                <li >${modal.integrations[1]}</li>
                <li >${modal.integrations[2]}</li>
               
                
            </ul>
                
                </div>
            </div>


            </div>
            </div> 


             <div class="  card p-3" style="width: 22rem;">
            <img src="${modal.image_link[0]}" class="card-img-top" alt="...">
            <div class="card-body">
            <p class="card-text">oefbv</p>
            </div>
            </div> 

   

    `;
}

loadAllData();