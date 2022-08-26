/**
 * google docsのelementからmarkdownテキストを返す。
 * google docsのテキストをコピーしてhtml貼り付けした場合、トップレベルはコンテナ的なspanになっている。
 * inputには、そのspanタグのElementが入る想定。
 * @param {HTMLElement} input 
 * @returns markdownになったstring
 */
export function convert(input) {
  return Array.from(input.children).map((el) => convertTag(el))
    .filter((text) => text.length > 0)
    .join('');
}

/**
 * @param {HTMLElement} el 
 * @returns markdownになったstring
 */
function convertTag(el) {
  switch (el.tagName) {
    case "SPAN":
      let text = el.innerText;
      if (el.style['font-weight']) {
        text = `**${text}**`;
      }
      if (el.style['font-style'] === 'italic') {
        text = `*${text}*`;
      }
      if (el.style['text-decoration-line']) {
        text = `~${text}~`;
      }
      return text;
    case "P":
      return Array.from(el.children).map((el) => convertTag(el))
        .filter((text) => text.length > 0)
        .join('') + '\n';
    default:
      return "";
  }
}
