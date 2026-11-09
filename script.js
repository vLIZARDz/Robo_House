document.querySelectorAll('.carousel').forEach(function (carousel) {
  var track = carousel.querySelector('.carousel__track');
  var prev = carousel.querySelector('.carousel__btn--prev');
  var next = carousel.querySelector('.carousel__btn--next');

  function step() {
    var slide = track.querySelector('.slide');
    var gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    return slide.getBoundingClientRect().width + gap;
  }

  function atEnd() {
    return track.scrollLeft + track.clientWidth >= track.scrollWidth - 5;
  }

  next.addEventListener('click', function () {
   
    if (atEnd()) {
      track.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      track.scrollBy({ left: step(), behavior: 'smooth' });
    }
  });

  prev.addEventListener('click', function () {
    if (track.scrollLeft <= 5) {
      track.scrollTo({ left: track.scrollWidth, behavior: 'smooth' });
    } else {
      track.scrollBy({ left: -step(), behavior: 'smooth' });
    }
  });
});




var form = document.getElementById('feedbackForm');
var msg = document.getElementById('formMsg');

form.addEventListener('submit', function (e) {
  e.preventDefault();
  var email = document.getElementById('email').value.trim();
  var ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!ok) {
    msg.textContent = 'Будь ласка, введіть коректну пошту.';
    msg.classList.add('error');
    return;
  }

  msg.classList.remove('error');
  msg.textContent = 'Надсилаємо...';

  fetch('https://formspree.io/f/xljjyyyz', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify({ email: email })
  })
    .then(function (response) {
      if (response.ok) {
        msg.textContent = 'Дякуємо! Ми зв\'яжемося з вами найближчим часом.';
        form.reset();
      } else {
        throw new Error('Помилка сервера');
      }
    })
    .catch(function () {
      msg.textContent = 'Не вдалося надіслати. Спробуйте ще раз пізніше.';
      msg.classList.add('error');
    });
});
