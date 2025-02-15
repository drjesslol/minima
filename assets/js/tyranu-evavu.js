
document.addEventListener('DOMContentLoaded', () => {
  const $restartButton = document.querySelector('.js-restart');
  const $options = document.querySelector('.js-options');
  const $option = document.querySelector('.js-option');
  const $suggestion = document.querySelector('.js-suggestion');
  const $previousCards = document.querySelector('.js-previous');
  const $previousHeading = document.querySelector('.js-previous-title');

  const deck = [];
  let remainingCards = [];
  const specialValues = {
    11: 'J',
    12: 'Q',
    13: 'K',
    14: 'A'
  };

  const card = (value, kind = 'button', classes = '') => (`
    <${kind} class="card-option ${classes} js-option" data-value=${value}>
      <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M6 2C5.44772 2 5 2.44772 5 3V21C5 21.5523 5.44771 22 6 22H18C18.5523 22 19 21.5523 19 21V3C19 2.44772 18.5523 2 18 2H6ZM3 3C3 1.34315 4.34315 0 6 0H18C19.6569 0 21 1.34314 21 3V21C21 22.6569 19.6569 24 18 24H6C4.34315 24 3 22.6569 3 21V3ZM8.25 4.44232C8.01755 4.17216 7.66222 4 7.26562 4C6.56918 4 6 4.53088 6 5.19111C6 5.79154 6.35648 6.34854 6.76709 6.80297C7.18353 7.26386 7.69434 7.66115 8.07724 7.94376C8.17883 8.01875 8.32117 8.01875 8.42276 7.94376C8.80566 7.66115 9.31647 7.26386 9.73291 6.80297C10.1435 6.34854 10.5 5.79154 10.5 5.19111C10.5 4.53088 9.93082 4 9.23438 4C8.83778 4 8.48245 4.17216 8.25 4.44232ZM14.7656 16C15.1622 16 15.5175 16.1722 15.75 16.4423C15.9825 16.1722 16.3378 16 16.7344 16C17.4308 16 18 16.5309 18 17.1911C18 17.7915 17.6435 18.3485 17.2329 18.803C16.8165 19.2639 16.3057 19.6611 15.9228 19.9438C15.8212 20.0187 15.6788 20.0187 15.5772 19.9438C15.1943 19.6611 14.6835 19.2639 14.2671 18.803C13.8565 18.3485 13.5 17.7915 13.5 17.1911C13.5 16.5309 14.0692 16 14.7656 16Z" fill="#000000"/>
      </svg>
      ${specialValues[value] || value}
    </${kind}>
  `);

  const setOptions = () => {
    const options = Array
      .from(new Set(deck))
      .map((option) => {
        if (remainingCards.includes(option)) {
          return card(option);
        } else {
          return card(option, 'div', 'card-option--disabled');
        }
      });
    $options.innerHTML = options.join('');
  }

  // Click handlers
  const restart = () => {
    remainingCards = [...deck];
    setOptions();
    $previousHeading.classList.add('hidden');
    $previousCards.innerHTML = '';
    $suggestion.textContent = 'Any';
  }

  const init = () => {
    for (let i = 2; i <= 14; i++) {
      deck.push(i, i, i, i);
    }

    restart();
  }

  const selectOption = (e) => {
    // get option
    const option = e.target.closest('.js-option');
    const value = parseInt(option.getAttribute('data-value'));

    // update displays
    $previousCards.innerHTML += card(value, 'div', 'card-option--small card-option--blue');
    $previousHeading.classList.remove('hidden');

    const indexToRemove = remainingCards.indexOf(value);
    if (indexToRemove !== -1) {
      remainingCards.splice(indexToRemove, 1);
    }

    setOptions();

    const tyranu = []
    const evavu = []
    remainingCards.forEach((card) => {
      console.log(card);
      if (card > value) {
        tyranu.push(card);
      } else if (card < value) {
        evavu.push(card);
      }
    });

    let suggest = 'Any';
    if (tyranu.length < evavu.length) {
      suggest = 'Evavu';
    } else if (tyranu.length > evavu.length) {
      suggest = 'Tyranu';
    }

    $suggestion.textContent = suggest;
  }

  $restartButton.addEventListener('click', restart);
  $options.addEventListener('click', selectOption);

  init();
});
