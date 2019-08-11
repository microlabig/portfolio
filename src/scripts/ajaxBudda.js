import {CONSTS} from '../helpers/consts';

;(function () {
    /* 
        Модалка
    */
    const modal = document.querySelector('.modal'); // находим модалку
    const tooltip = modal.querySelector('.modal__tooltip'); // находим нижний тултип
    const tooltipText = modal.querySelector('.modal__tooltip-text'); // находим текст для сообщения    
    const modalButton = modal.querySelector('.modal__button'); // находим кнопку "закрыть"
    const tooltipButton = modal.querySelector('.modal__tooltip-close'); // находим кнопку "Х"

    // показываем модалку
    let showModal = function (error) {
        let color, text;

        if (error >= 400) {
            color = 'brown';
            text = 'Сервер перегружен';
        } else if (error === -1 || error === undefined) {
            color = 'red';
            text = 'Сообщение не отправлено';
        } else {
            color = 'green';
            //text = 'Сообщение отправлено';
            text = 'Отправка сообщений приостановлена на неопределенное время';
        }

        if (tooltip.classList.contains('red')) {
            tooltip.classList.remove('red');       
        }
        if (tooltip.classList.contains('brown')) {
            tooltip.classList.remove('brown');
        }
        if (tooltip.classList.contains('green')) {
            tooltip.classList.remove('green');
        }

        tooltipText.textContent = text;
        tooltip.classList.add(color);
        modal.classList.add('show');
    };

    // скрываем модалку
    let closeModal = function () {
        modal.classList.remove('show');
    };

    // скрываем нижний тултип
    tooltipButton.addEventListener('click', e=> {
        e.preventDefault;
        if (tooltip.classList.contains('show')) tooltip.classList.remove("show");
    });

    // скрываем модалку по клике на кнопке "закрыть"
    modalButton.addEventListener('click', e=> {
        e.preventDefault;
        tooltipButton.click();
        closeModal();
    });
    


    /*
        Ajax и промис
    */
    //отправляем данные и создаем новый промис для принятия ответа от сервера
    function SendData(object) {        
        const ajax = new Promise(function (resolve) {
            // отправляем запрос на сервер
            const xhr = new XMLHttpRequest();
            xhr.open("POST", CONSTS.BASEURLFEEDBACK);           
            xhr.responseType = "json";
            xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest"); //добавлям заголовок, чтобы не было ошибки 302       

            xhr.send(object);

            xhr.addEventListener('load', function () {
                resolve(xhr.response);
            });            
        });
        return ajax;
    }


    /*
        Валидация и отправка данных
    */
    const button = document.querySelector('#form').querySelector('.form__elem-button');

    //валидация всех данных
    function validate(form) {
        let IsValidate = true;
        if (!validateFieldAndShowMessage(form.elements.name)) IsValidate = false;
        if (!validateFieldAndShowMessage(form.elements.comments)) IsValidate = false;
        if (!validateFieldAndShowMessage(form.elements.email)) IsValidate = false;
        return IsValidate;
    }

    //валидация полей
    function validateFieldAndShowMessage(field) {
        const sibling = field.nextElementSibling.querySelector('.form__tooltip-text'); // ищем текстовое поле для передачи информации
        const parent = field.parentElement.parentElement; // ищем label

        const isValidate = field.checkValidity();

        if (!isValidate) {
            sibling.textContent = field.validationMessage;
            parent.classList.add("is-error");
        } else {
            if (parent.classList.contains("is-error")) parent.classList.remove("is-error");
        }

        return isValidate;
    }

    //---------------------------
    // клик на кнопке "Отправить"
    //---------------------------
    button.addEventListener('click', e => {
        e.preventDefault();
        const target = e.target; // возьмем кнопку

        const form = document.querySelector('#form');

        // подготовка данных
        let email = form.elements.email.value;
        let name = form.elements.name.value;
        let comments = form.elements.comments.value;

        let obj = new FormData(document.forms.formrequest);
        obj.append("name", name);
            obj.append("phone", "88007553535"); // временно для сервера loftshool
        obj.append("comment", comments);            
        obj.append("to", email);

        if (validate(form)) { // если все данные валидны 

            target.disabled = true; // дисаблим кнопку
            target.classList.add('disabled');  

            SendData(obj).then(function(response) {
                showModal(response.status,response.text);
                tooltip.classList.add("show"); 

                target.disabled = false; // энаблим кнопку
                target.classList.remove('disabled'); 
            });
            
        }
    });

})();
