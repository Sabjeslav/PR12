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

    const firebaseConfig = {
        apiKey: "AIzaSyAs6hwBcizboLxGlmDiA33uSmCvJsMISjc",
        authDomain: "burgerquiz-f11d4.firebaseapp.com",
        databaseURL: "https://burgerquiz-f11d4-default-rtdb.europe-west1.firebasedatabase.app",
        projectId: "burgerquiz-f11d4",
        storageBucket: "burgerquiz-f11d4.appspot.com",
        messagingSenderId: "300502745176",
        appId: "1:300502745176:web:81b1182e80bcde3630ca2d"
    };
    firebase.initializeApp(firebaseConfig);


    const getData = () => {
        formAnswers.textContent = 'Loading content...';
        nextBtn.classList.add("d-none");
        prevBtn.classList.add("d-none");
        firebase.database().ref().child('questions').once('value')
            .then(snap => playTest(snap.val()))
    }


    btnOpenModal.addEventListener("click", () => {
        modal.classList.toggle('d-block');
        getData();
    });


    closeModal.addEventListener("click", () => {
        modal.classList.remove('d-block');
    });


    const playTest = (question) => {
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

            switch (true) {
                case (numberQuestion == 0):
                    prevBtn.classList.add("d-none");
                    nextBtn.classList.remove("d-none");
                    sendBtn.classList.add("d-none");
                    renderAnswers(index);
                    break;

                case (numberQuestion >= 0 && numberQuestion <= question.length - 1):
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
            const inputs = [...formAnswers.elements].filter((input) => input.checked || input.id === 'numberPhone');

            inputs.forEach((input, index) => {
                if (numberQuestion >= 0 && numberQuestion <= question.length - 1) {
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
            firebase
                .database()
                .ref()
                .child('contacts')
                .push(finalAnswers)
        }
    }


})
  