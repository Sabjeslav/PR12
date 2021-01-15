document.addEventListener("DOMContentLoaded", () => {
    'use strict';


    const btnOpenModal = document.getElementById("btnOpenModal");
    const modal = document.getElementById("modalBlock");
    const closeModal = document.getElementById("closeModal");
    const questionTitle = document.getElementById("question");
    const formAnswers = document.getElementById("formAnswers");
    const burgerPath = "./image/burger.png";
    const burgerBlackPath = "./image/burgerBlack.png";
    
    btnOpenModal.addEventListener("click", () => {
      modal.classList.toggle('d-block');
      playTest();
    });
  
  
    closeModal.addEventListener("click", () => {
      modal.classList.remove('d-block');
    });
  
  
    const playTest = () => {
           
      const renderQuestions = () => {
        questionTitle.textContent = 'Какого цвета бургер вы хотите?'
        formAnswers.innerHTML = `
            <div class="answers-item d-flex flex-column">
                <input type="radio" id="answerItem1" name="answer" class="d-none">
                <label for="answerItem1" class="d-flex flex-column justify-content-between">
                <img class="answerImg" src=${burgerPath} alt="burger">
                <span>Стандарт</span>
                </label>
            </div>
            <div class="answers-item d-flex justify-content-center">
            <input type="radio" id="answerItem2" name="answer" class="d-none">
            <label for="answerItem2" class="d-flex flex-column justify-content-between">
                <img class="answerImg" src=${burgerBlackPath} alt="burger">
                <span>Черный</span>
            </label>
            </div>
        `
      }
  
      renderQuestions();
     
    }
  
  })
  