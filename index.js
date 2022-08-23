document.getElementById("input-area").addEventListener("input", (e) => {
  const input = e.target.firstChild;
  // htmlじゃなかったらハネるなど
  const md = convert(input);

  document.getElementById("output-area").innerHTML = md;
})

function convert(input) {
  // TODO: なんか変換ロジック
  return input.innerText;
}
