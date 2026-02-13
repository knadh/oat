document.addEventListener('click', (e) => {
  if (e.target.matches('.navbar .toggle')) {
    e.target.classList.toggle('open');
    e.target.nextElementSibling.classList.toggle('open');
  }
});
