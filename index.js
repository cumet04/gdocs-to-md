import { convert } from './convert.js'

document.getElementById("input-area").addEventListener("input", (e) => {
  const input = e.target.firstChild;
  // htmlじゃなかったらハネるなど
  const md = convert(input);

  document.getElementById("output-area").innerHTML = md;
})
