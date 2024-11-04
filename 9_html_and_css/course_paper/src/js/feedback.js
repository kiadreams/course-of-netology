'use strict'

const onFeedbackForm = document.getElementById('button-mail');
const offFeedbackForm = document.getElementById('feedback-button');

onFeedbackForm.addEventListener('click', () => {
    document.querySelector('.forms').classList.remove('remove-element');
});

offFeedbackForm.addEventListener('click', () => {
    document.querySelector('.forms').classList.add('remove-element');
});