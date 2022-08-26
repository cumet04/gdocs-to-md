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
      if (text === '\n') return '';
      if (el.style['font-weight'] === '700') {
        text = `**${text}**`;
      }
      if (el.style['font-style'] === 'italic') {
        text = `*${text}*`;
      }
      if (el.style['text-decoration-line'] === 'line-through') {
        text = `~${text}~`;
      }
      return text;
    case "P":
      return Array.from(el.children).map((el) => convertTag(el))
        .filter((text) => text.length > 0)
        .join('') + '\n';
    case "H1":
    case "H2":
    case "H3":
    case "H4":
    case "H5":
    case "H6":
      // ヘッダの直後に空行を入れずにテキストを挟んだ場合、何故かそのテキスト（やノード）がヘッダタグの配下になることがある。その場合の対応
      const child = el.children[0];
      if (child.tagName === "SPAN" && child.children.length > 0) {
        return Array.from(child.children).map((el) => convertTag(el))
          .filter((text) => text.length > 0)
          .join('');
      }

      // こちらは普通のヘッダの対応
      const level = Number(el.tagName[1])
      return `${"#".repeat(level)} ${el.innerText}\n`;
    default:
      return "";
  }
}
