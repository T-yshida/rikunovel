const vscode = require("vscode");
const backgrounds = require("../data/background");

class HoverProvider
{
    provideHover(document, position)
    {
        const range = document.getWordRangeAtPosition(
            position,
            /<背景:\d+>/
        );

        if (!range)
            return;

        const text = document.getText(range);

        const match = text.match(/<背景:(\d+)>/);

        if (!match)
            return;

        const id = parseInt(match[1]);

        const name = backgrounds[id];

        if (!name)
            return;

        return new vscode.Hover(
            `### 背景\n\n**${id} : ${name}**`
        );
    }
}
module.exports = HoverProvider;