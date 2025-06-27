const languages = [
  {
    name: "JavaScript",
    vote: 0,
  },
  {
    name: "Python",
    vote: 0,
  },
  {
    name: "Java",
    vote: 0,
  },
];

const buttons = document.querySelector(".buttons");

function renderComponent() {
  buttons.innerHTML = languages
    .map(
      (lang) =>
        `<button onclick="handleClick('${lang.name}')">${lang.name}</button>`
    )
    .join("");

  const voteElement = document.querySelector(".votes");

  voteElement.innerHTML = languages
    .map(
      (lang) => `
    <p>${lang.name} : <span id='js_${lang.name}'>${lang.vote}</span> </p>
    `
    )
    .join("");
}

renderComponent();

function handleClick(lang){
    const name = lang

    const voteElement = document.getElementById(`js_${name}`);
    languages.forEach(lang => {
        if (lang.name === name) {
            lang.vote += 1;
            voteElement.innerText = lang.vote;
        }
    });
    renderComponent();
}

setInterval(()=>{
    languages.forEach((lang) => {
      if (Math.random() > 0.5) {
        lang.vote += 1;
      }
    });
    renderComponent();
},2000)