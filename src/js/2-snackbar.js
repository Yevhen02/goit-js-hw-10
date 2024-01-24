// Підключена бібліотека iziToast
import iziToast from 'izitoast';
// Підключена css style iziToast
import 'izitoast/dist/css/iziToast.min.css';

// EVENT LISTENER
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');

  form.addEventListener('submit', async event => {
    event.preventDefault();

    const delayInput = form.querySelector('input[name="delay"]');
    const stateInputs = form.querySelectorAll('input[name="state"]');

    const delay = parseInt(delayInput.value, 10);

    const selectedStateInput = Array.from(stateInputs).find(
      input => input.checked
    );

    if (!selectedStateInput) {
      iziToast.error({
        title: 'Error',
        message: 'Please select a state (Fulfilled or Rejected).',
        position: 'topCenter',
      });
      return;
    }

    const state = selectedStateInput.value;

    form.reset();

    const promise = new Promise((resolve, reject) => {
      if (state === 'fulfilled') {
        setTimeout(() => {
          resolve(delay);
        }, delay);
      } else {
        setTimeout(() => {
          reject(delay);
        }, delay);
      }
    });

    try {
      const result = await promise;
      iziToast.success({
        title: 'Success',
        message: `✅ Fulfilled promise in ${result}ms`,
        position: 'topCenter',
      });
    } catch (error) {
      iziToast.error({
        title: 'Error',
        message: `❌ Rejected promise in ${error}ms`,
        position: 'topCenter',
      });
    }
  });
});
