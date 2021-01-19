document.addEventListener("DOMContentLoaded", () => {
    'use strict';


    const btnOpenModal = document.getElementById("btnOpenModal");
    const modal = document.getElementById("modalBlock");
    const closeModal = document.getElementById("closeModal");
    const questionTitle = document.getElementById("question");
    const formAnswers = document.getElementById("formAnswers");
    // const burgerPath = "./image/burger.png";
    // const burgerBlackPath = "./image/burgerBlack.png";
    const nextBtn = document.querySelector('#next')
    const prevBtn = document.querySelector('#prev')
    

    const question = [
      {
          question: "Какого цвета бургер?",
          answers: [
              {
                  title: 'Стандарт',
                  url: './image/burger.png'
              },
              {
                  title: 'Черный',
                  url: './image/burgerBlack.png'
              }
          ],
          type: 'radio'
      },
      {
          question: "Из какого мяса котлета?",
          answers: [
              {
                  title: 'Курица',
                  url: './image/chickenMeat.png'
              },
              {
                  title: 'Говядина',
                  url: './image/beefMeat.png'
              },
              {
                  title: 'Свинина',
                  url: './image/porkMeat.png'
              }
          ],
          type: 'radio'
      },
      {
          question: "Дополнительные ингредиенты?",
          answers: [
              {
                  title: 'Помидор',
                  url: './image/tomato.png'
              },
              {
                  title: 'Огурец',
                  url: './image/cucumber.png'
              },
              {
                  title: 'Салат',
                  url: './image/salad.png'
              },
              {
                  title: 'Лук',
                  url: './image/onion.png'
              }
          ],
          type: 'checkbox'
      },
      {
          question: "Добавить соус?",
          answers: [
              {
                  title: 'Чесночный',
                  url: './image/sauce1.png'
              },
              {
                  title: 'Томатный',
                  url: './image/sauce2.png'
              },
              {
                  title: 'Горчичный',
                  url: './image/sauce3.png'
              }
          ],
          type: 'radio'
      }
  ];

    btnOpenModal.addEventListener("click", () => {
      modal.classList.toggle('d-block');
      playTest();
    });
  
  
    closeModal.addEventListener("click", () => {
      modal.classList.remove('d-block');
    });
  
  
    const playTest = () => {
      let numberQuestion = 0;

      const renderAnswers = (index) => {
        question[index].answers.forEach((answer) => {
          const answerItem = document.createElement('div');
          answerItem.classList.add('answers-item', 'd-flex', 'flex-column');

          answerItem.innerHTML = `
            <input type="${question[index].type}" id="${answer.title}" name="answer" class="d-none">
            <label for="${answer.title}" class="d-flex flex-column justify-content-between">
            <img class="answerImg" src=${answer.url} alt="burger">
            <span>${answer.title}</span>
            </label>
          `
          formAnswers.appendChild(answerItem);
        })

      }
           
      const renderQuestions = (index) => {
        formAnswers.innerHTML = '';
        if (numberQuestion === 0) {
          prevBtn.classList.add('invisible');
        }

        if (numberQuestion === question.length-1) {
          nextBtn.classList.add('invisible');
        }

        if (numberQuestion > 0) {
          prevBtn.classList.remove('invisible');
        }

        if (numberQuestion < question.length-1) {
          nextBtn.classList.remove('invisible');
        }

        questionTitle.textContent = `${question[index].question}`;
        renderAnswers(index);
        
      }
      renderQuestions(numberQuestion);

      nextBtn.onclick = () => {
        numberQuestion++;
        renderQuestions(numberQuestion);
      }

      prevBtn.onclick = () => {
        numberQuestion--;
        renderQuestions(numberQuestion);
      }
    }

  
  })
  