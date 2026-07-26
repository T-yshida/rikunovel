const vscode = require("vscode");
const bgms = require("../data/bgm");

class bgmHoverProvider {
    provideHover(document, position) {
        const range = document.getWordRangeAtPosition(
            position,
            /<音楽:\d+>/
        );

        if (!range)
            return;

        const text = document.getText(range);

        const match = text.match(/<音楽:(\d+)>/);

        if (!match)
            return;

        const id = parseInt(match[1]);

        const name = bgms[id];

        if (!name)
            return;

        return new vscode.Hover(
            `### 音楽\n\n**${id} : ${name}**`
        );
    }
}
module.exports = bgmHoverProvider;