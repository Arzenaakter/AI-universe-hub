
// All the data load from this function
const loadAllData = (dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    fetch(url)
        .then(res => res.json())
        .then(data => showCardData(data.data.tools, dataLimit))

    // start loader
    loaderSpninner(true);


}
// display card function from here
const showCardData = (cards, dataLimit) => {


    const cardContainer = document.getElementById('card-container');
    cardContainer.textContent = ' ';

    const seeMore = document.getElementById('see-more');
    if (dataLimit && cards.length > 6) {
        cards = cards.slice(0, 6);

        seeMore.classList.remove('d-none');
    }
    else {
        seeMore.classList.add('d-none');
    }



    for (let card of cards) {

        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `

        
        <div class="card h-100 p-3">
        <img src=${card.image} class="card-img-top  rounded " alt="...">
        <div class="card-body">
          <h5 class="card-title">Features</h5>
         
          <ol>
          
          ${card.features ? card.features.map(featureTitle => `<li> ${featureTitle}</li>`).join('') : ' '
            }
         
          </ol>
          
        </div>
        <hr>
        <div class=" d-flex justify-content-between align-items-center">
         <div>
         <h5>${card.name}</h5>
         <p clas=""> <i class="far fa-calendar-alt"></i>  ${card.published_in}</p>
         </div>
         <i class= "fas fa-arrow-right text-danger rounded-5 bg-danger-subtle p-2" data-bs-toggle="modal" data-bs-target="#cardModal" data-bs-toggle="modal" data-bs-target="#cardModal" onclick =" fetchModalDetails('${card.id}')"></i>

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

    // console.log(modal.accuracy.score)

    const modalCards = document.getElementById('modal-body');

    modalCards.innerHTML = `

    
         <div class="  card  bg-danger-subtle border border-danger  w-lg-25  "  >
                
            <div class="card-body mt-4 ">
            <div><h5 class="">${modal.description}</h5></div>

            <div class =" d-flex gap-2 justify-content-center ">

               
            <div class="bg-white p-2  rounded  text-center text-success fw-semibold d-flex align-items-center justify-content-center"><p>${modal.pricing !== null ? modal.pricing[0].price + "<br>" + modal.pricing[0].plan : 'Free of cost'}</p></div>

            <div class="bg-white p-2 rounded   text-center text-warning fw-semibold  d-flex align-items-center justify-content-center"><p>${modal.pricing !== null ? modal.pricing[1].price + "<br>" + modal.pricing[1].plan : 'Free of cost'}</p></div>

            <div class="bg-white p-2 rounded   text-center text-danger fw-semibold d-flex align-items-center justify-content-center"><p>${modal.pricing !== null ? modal.pricing[2].price + "<br>" + modal.pricing[2].plan : 'Free of cost'}</p></div>
            
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

                   ${modal.integrations !== null ? modal.integrations.map(integration => `<li> ${integration}</li>`).join('') : " No Data Found "
        }
                    
                 </ul>
                
                </div>
            </div>

            </div>
            </div> 


            <div class="  card  w-lg-25"   >
                    
                    <img src="${modal.image_link[0]}" class="card-img-top position-relative  rounded" alt="...">
                  
                    <h5 class ="${modal.accuracy.score === null ?'d-none' : 'badge bg-danger position-absolute top-0 end-0 mt-4 me-4 p-2'}">${modal.accuracy.score * 100}% Accuracy</h5>

                    
            <div class="card-body mt-4">

            <h6 class="text-center mt-4"> ${modal.input_output_examples !== null ? modal.input_output_examples[0].input : 'No! Not! take break!!'}</h6>
            <p class="text-center mt-4"> ${modal.input_output_examples !== null ? modal.input_output_examples[0].output : 'No! Not! take break!!'}</p>
       
            </div>
            </div> 
    `;



}
// spninner loding
const loaderSpninner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none');
    }
    else {
        loaderSection.classList.add('d-none');

    }
}


//  button see more
document.getElementById('seeMore-btn').addEventListener('click', function () {


    loadAllData();

})



loadAllData(6);


// sorting
const loadAllDataSort = () => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    fetch(url)
        .then(res => res.json())
        .then(data => showSortArray(data.data.tools))




}
const showSortArray = (sortData) => {

    


    document.getElementById('sort-btn').addEventListener('click', function () {

        const cardContainer = document.getElementById('card-container');
        cardContainer.textContent = ' ';


        // console.log(sortData.sort(Arraysort))
        for (let data of (sortData.sort(Arraysort))) {

            // console.log(data)

            // .......
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `


        <div class="card h-100 p-3">
                <img src=${data.image} class="card-img-top  rounded " alt="...">
            <div class="card-body">
                 <h5 class="card-title">Features</h5>
 
                 <ol>
  
                     ${data.features ? data.features.map(featureTitle => `<li> ${featureTitle}</li>`).join('') : ' '
                         }
 
                     </ol>
  
            </div>
            <hr>
            <div class=" d-flex justify-content-between align-items-center">
                    <div>
                     <h5>${data.name}</h5>
                        <p clas=""> <i class="far fa-calendar-alt"></i>  ${data.published_in}</p>
                    </div>
            <i class= "fas fa-arrow-right text-danger rounded-5 bg-danger-subtle p-2" data-bs-toggle="modal" data-bs-target="#cardModal" data-bs-toggle="modal" data-bs-target="#cardModal" onclick =" fetchModalDetailssort('${data.id}')"></i>

        </div>
        </div>


            `;
            cardContainer.appendChild(div);

            // .......


        }

    })



}


//....single data 
const fetchModalDetailssort = (card_id) => {

    // console.log(card_id)
    const url = `https://openapi.programming-hero.com/api/ai/tool/${card_id}`;

    fetch(url)
        .then(res => res.json())
        .then(data => showModalDetails(data.data))
}

const Arraysort = (a, b) => {
    const dateA = new Date(a.published_in);
    const dateB = new Date(b.published_in);
    if (dateA > dateB) {
        return 1;
    }
    else if (dateA < dateB) {
        return -1;

    }
    else {
        return 0;
    }


}



loadAllDataSort();