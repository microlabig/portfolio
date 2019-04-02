;(function () {

    const button = document.querySelector('.form__elem-button');
    
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

    // клик на кнопке "Отправить"
    button.addEventListener('click', e => {
        e.preventDefault();
        
        const myForm = document.querySelector('#form');

        //if (validate(myForm)) AjaxSend(obj);
    });
    
})();
