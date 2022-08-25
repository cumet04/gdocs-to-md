import { convert } from './convert.js'


document.getElementsByClassName("input-area")[0].addEventListener("input", (e) => {
  const input = e.target.firstChild;
  // htmlじゃなかったらハネるなど
  const md = convert(input);

  document.getElementsByClassName("output-area")[0].innerHTML = md;
})
