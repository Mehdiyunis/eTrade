import Data from "./data.js";

const cardsContainer = document.querySelector(".cards-container");


Data.map((item) => {
  const {id,discount, imgURL1, imgURL2, stars, title, price} = item;


  cardsContainer.innerHTML += `
    <div class="col-lg-3 card-outset">
    <div class="card-inset">
        ${ /* bu kod jsondan gələn null dəyərlərin yazılmaması üçündür  */ 
            discount == null ? `<p class="discount" style="display:none;"></p>` : `<p class="discount">${discount}</p>`}
        <div class="img-div">
            <img class="first-img"
                src="${imgURL1}"
                alt="">
            <img class="last-img"
                src="${imgURL2}"
                alt="">
                
            <div class="select-option-btn">
                <i class="fa-solid fa-eye show-module-btn" data-id="${id}"></i>
                <button>Select Option</button>
                <i class="bi bi-heart"></i>
            </div>
        </div>


        <div class="content">
        
        ${ /* bu kod sayəsində gələn dəyər null dursa ekrana heç bir element çap olunmur */
          stars == null
            ? ""
            : `<span class="star"> ${stars} <i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i></span>`
        } 
            <h4 class="title">${title}</h4>
            <p class="price">
                <span class="first">${price[0]}</span>
                <span class="last">${price[1]}</span>
            </p>
            
            ${
              stars == null
                ? `<div class="colors">
                <span></span>
                <span></span>
                <span></span>
            </div>`
                : ""
            }
        </div>
    </div>
</div>
    
    `;
});


const showModuleBtn = document.querySelectorAll(".show-module-btn"); /* kartın içindəki modulu açan btn ni seçir */
const moduleConatiner = document.querySelector('.module-conatiner'); /* modulun yerləşəcəyi elemnti seçir */

// btn-ləri loopa salıb onlara clik verilir 
showModuleBtn.forEach((btn) => {
  btn.addEventListener("click", () => {

    const dataId = btn.getAttribute('data-id')

    // klik olunan btn-nin yunik olaraq verilmiş data-id atributunun dəyərini yuxarda götürdük
    // indi isə yenə json-dan gələn yunik id ilə btn-nin aydisini qarşılaşdırıb bərəbər olan məlumatları alırıq
    const data = Data.filter((cardinfo)=>{
        return cardinfo.id == dataId
    })
    
    // burda az əvvəl aldığımız məlumatları parçalıyırıq
    const [{discount, imgURL1, stars, title, price}] = data
    

    moduleConatiner.innerHTML = `
      <div class="card-modal show-praduct-modal">

          <div class="modal-container">
              <div class="modal-close">
                  <button class="modal-close-btn" onclick="removeClass()">x</button>
              </div>


              <div class="row praduct-about">
                  <div class="praduct-contetn col-lg-6">
                      <span class="praduct-feedback">${stars == null
                        ? ""
                        : stars}
                      <i class="bi bi-star-fill"></i>
                      <i class="bi bi-star-fill"></i>
                      <i class="bi bi-star-fill"></i>
                      <i class="bi bi-star-fill"></i>
                      <i class="bi bi-star-fill"></i>
                      
                      </span>
                      <h4 class="praduct-name">${title}</h4>
                      <p class="praduct-price">${price.join(' - ')}</p>
                      <div class="colors">
                          <span></span>
                          <span></span>
                          <span></span>
                      </div>
                  </div>
                  <div class="img-div col-lg-6">
                      
                      ${
                        discount == false
                          ? ''
                          : `<p class="discount">${discount}</p>`
                      }

                      <img class="img"
                          src="${imgURL1}"
                          alt="">
                  </div>

              </div>
          </div>

      </div>
      
      `;

  });
});

