import { CONSTS } from '../helpers/consts';

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
    const showModal = (success, message) => {
        const color = success ? 'green' : 'red';
        const text = success ? 'Сообщение отправлено' : message;

        if (tooltip.classList.contains('red')) {
            tooltip.classList.remove('red');       
        }
        if (tooltip.classList.contains('green')) {
            tooltip.classList.remove('green');
        }

        tooltipText.textContent = text;
        tooltip.classList.add(color);
        modal.classList.add('show');
    };

    // скрываем модалку
    const closeModal = () => {
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
    const sendData = (object) => {
        return fetch(`${CONSTS.BASEURL_FEEDBACK}/api/mail`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: object,
            redirect: 'follow',
        });
    }

    /*
        Валидация и отправка данных
    */
    const button = document.querySelector('#form').querySelector('.form__elem-button');

    //валидация всех данных
    const validate = (form) => {
        let IsValidate = true;
        if (!validateFieldAndShowMessage(form.elements.name)) IsValidate = false;
        if (!validateFieldAndShowMessage(form.elements.comment)) IsValidate = false;
        if (!validateFieldAndShowMessage(form.elements.email)) IsValidate = false;
        return IsValidate;
    }

    //валидация полей
    const validateFieldAndShowMessage = (field) => {
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
        let comment = form.elements.comment.value;

        if (validate(form)) { // если все данные валидны 
            const obj = new URLSearchParams();

            obj.append("name", name);
            obj.append("email", email);
            obj.append("comment", comment);
            obj.append("from", "portfolio");

            target.disabled = true; // дисаблим кнопку
            target.classList.add('disabled');  

            sendData(obj)
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Ошибка отправки данных на сервер');
                    }
                })
                .then(({success, message}) => {
                    showModal(success, message);
                    tooltip.classList.add("show"); 

                    target.disabled = false; // энаблим кнопку
                    target.classList.remove('disabled'); 
                })
                .catch(console.error);
        }
    });
})();
