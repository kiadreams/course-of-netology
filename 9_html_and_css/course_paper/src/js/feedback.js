'use strict'

const onFeedbackForm = document.getElementById('button-mail');
const offFeedbackForm = document.querySelector(
    '.forms_feedback__button-close'
);

onFeedbackForm.addEventListener('click', () => {
    console.log('открыли');
    document.querySelector('.forms').classList.remove('remove-element');
});

offFeedbackForm.addEventListener('click', () => {
    console.log('скрыли');
    document.querySelector('.forms').classList.add('remove-element');
});