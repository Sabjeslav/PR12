document.addEventListener("DOMContentLoaded", () => {
    'use strict';


    const btnOpenModal = document.getElementById("btnOpenModal");
    const modal = document.getElementById("modalBlock");
    const closeModal = document.getElementById("closeModal");
    const questionTitle = document.getElementById("question");
    const formAnswers = document.getElementById("formAnswers");
    const nextBtn = document.querySelector('#next')
    const prevBtn = document.querySelector('#prev')
    const sendBtn = document.querySelector('#send')
    

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
      const finalAnswers = [];

      const renderAnswers = (index) => {
        question[index].answers.forEach((answer) => {
          const answerItem = document.createElement('div');
          answerItem.classList.add('answers-item', 'd-flex', 'justify-content-center');

          answerItem.innerHTML = `
            <input type="${question[index].type}" id="${answer.title}" name="answer" class="d-none" value="${answer.title}">
            <label for="${answer.title}" class="d-flex flex-column justify-content-between">
            <img class="answerImg" src="${answer.url}" alt="burger">
            <span>${answer.title}</span>
            </label>
          `
          formAnswers.appendChild(answerItem);
        })

      }
           
      const renderQuestions = (index) => {
        formAnswers.innerHTML = '';
        
        /*if (numberQuestion >= 0 && numberQuestion <= question.length -1 ) {
          questionTitle.textContent = `${question[index].question}`;
          renderAnswers(index);
          nextBtn.classList.remove('d-none');
          prevBtn.classList.remove('d-none');
          sendBtn.classList.add('d-none');
        }

        if (numberQuestion === 0) {
          prevBtn.classList.add('d-none');
        }

        if (numberQuestion === question.length) {
          nextBtn.classList.add('d-none');
          prevBtn.classList.add('d-none');
          sendBtn.classList.remove('d-none');
          formAnswers.innerHTML = `
          <div class = "form-group">
            <label for="numberPhone">Enter your number</label>
            <input type="phone" class="form-control" id="numberPhone">
          </div>
          `;
        }

        if (numberQuestion === question.length + 1) {
          formAnswers.textContent = 'Спасибо за пройденный тест!';
          setTimeout(() => {
            modal.classList.remove('d-block');
          }, 2000);
        }*/

        switch (true) {
          case (numberQuestion == 0):
          prevBtn.classList.add("d-none");
          nextBtn.classList.remove("d-none");
          sendBtn.classList.add("d-none");
          renderAnswers(index);
          break;
        
        case (numberQuestion >= 0 && numberQuestion <= question.length-1):
          questionTitle.textContent = question[index].question;
          prevBtn.classList.remove("d-none");
          nextBtn.classList.remove("d-none");
          sendBtn.classList.add("d-none");
          renderAnswers(index);
          break;
        
        case (numberQuestion === question.length):
          nextBtn.classList.add("d-none");
          prevBtn.classList.add("d-none");
          sendBtn.classList.remove("d-none");
          questionTitle.textContent = "Спасибо за пройденный тест!"
          formAnswers.innerHTML = `
            <div class="form-group">
              <label for="numberPhone"> Оставьте свой номер телефона. Мы Вам позвоним!</label>
              <input type="phone" class="form-control" id="numberPhone" placeholder="Номер телефона:">
            </div>
          `;
          break;
        
        case (numberQuestion === question.length + 1):
          sendBtn.classList.add("d-none");
          questionTitle.textContent = "Спасибо за заказ! Наш менеджер свяжется с вами в ближайшее время! ";
          formAnswers.innerHTML = '';
          setTimeout(() => {
            modal.classList.remove('d-block');
          }, 2000);
          break;
        }

      }

      renderQuestions(numberQuestion);

      const checkAnswer = () => {
        const obj = {};
        const inputs = [...formAnswers.elements].filter((input) => input.checked || input.id ==='numberPhone');

        inputs.forEach((input, index) => {
          if (numberQuestion >= 0 && numberQuestion <= question.length-1){
            obj[`${index}_${question[numberQuestion].question}`] = input.value;
          }

          if (numberQuestion === question.length) {
            obj['Номер телефона'] = input.value;
          }
          
        })
        finalAnswers.push(obj);
        console.log(finalAnswers);
      }

      nextBtn.onclick = () => {
        checkAnswer();
        numberQuestion++;
        renderQuestions(numberQuestion);
      }

      prevBtn.onclick = () => {
        numberQuestion--;
        renderQuestions(numberQuestion);
      }

      sendBtn.onclick = () => {
        checkAnswer();
        numberQuestion++;
        renderQuestions(numberQuestion);
        console.log(finalAnswers);
      }
    }

  
  })
  