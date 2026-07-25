const vscode = require("vscode");

class AutoComplete {
    provideCompletionItems(document, position) {
        const expressions =
        {
            kanojo: [
                "NORMAL",
                "SMILE",
                "CRY",
                "TROUBLE",
                "ANGRY",
                "sSMILE",
                "SURPRISE",
                "SHY",
                "SAD",
                "HEART",
                "SERIOUS",
                "JITOME",
                "WINK",
                "MADNESS",
                "YNORMAL",
                "YSERIOUS",
                "YHEART",
                "YHSMILE",
                "YJITOME"
            ]
        };

        const line = document.lineAt(position.line)
            .text.substring(0, position.character);

        //--------------------------------
        // コマンド
        //--------------------------------
        if (line.endsWith("<")) {
            return [
                new vscode.CompletionItem("背景"),
                new vscode.CompletionItem("選択肢"),
                new vscode.CompletionItem("フェードイン"),
                new vscode.CompletionItem("フェードアウト"),
                new vscode.CompletionItem("立ち絵"),
                new vscode.CompletionItem("値変化"),
                new vscode.CompletionItem("音楽"),
                new vscode.CompletionItem("エンド"),
                new vscode.CompletionItem("特殊フラグ")
            ];
        }

        //--------------------------------
        // 立ち絵操作
        //--------------------------------
        if (line.endsWith("<立ち絵:")) {
            return [
                new vscode.CompletionItem("出場"),
                new vscode.CompletionItem("移動"),
                new vscode.CompletionItem("退場"),
                new vscode.CompletionItem("立ち絵変更")
            ];
        }

        //--------------------------------
        // エンド場所
        //--------------------------------
        if (line.endsWith("<エンド:")) {
            return [
                new vscode.CompletionItem("SHOPPING"),
                new vscode.CompletionItem("THEMEPARK"),
                new vscode.CompletionItem("HOME"),
                new vscode.CompletionItem("KAIKATU"),
                new vscode.CompletionItem("SEA"),
                new vscode.CompletionItem("CAFE"),
                new vscode.CompletionItem("FOREST"),
                new vscode.CompletionItem("SHRINE"),
                new vscode.CompletionItem("AQUA")
            ];
        }

        //--------------------------------
        // 特殊フラグ
        //--------------------------------
        if (line.endsWith("<特殊フラグ:")) {
            return [
                new vscode.CompletionItem("SHOPPING"),
                new vscode.CompletionItem("THEMEPARK"),
                new vscode.CompletionItem("HOME"),
                new vscode.CompletionItem("KAIKATU"),
                new vscode.CompletionItem("SEA"),
                new vscode.CompletionItem("CAFE"),
                new vscode.CompletionItem("FOREST"),
                new vscode.CompletionItem("SHRINE"),
                new vscode.CompletionItem("AQUA")
            ];
        }

        //-------------------------------
        //音楽
        //-------------------------------
        if (line.endsWith("<音楽:")) {
            return [
                new vscode.CompletionItem("STOP"),
                new vscode.CompletionItem("PARSE"),
                new vscode.CompletionItem("REPLAY")
            ];
        }

        //-------------------------------
        //立ち絵変更の表情
        //-------------------------------
        const match = line.match(/^<立ち絵:立ち絵変更\/([a-z]+)\/([^>]*)$/);
        if (match) {
            const character = match[1];

            if (expressions[character]) {
                return expressions[character].map(x =>
                    new vscode.CompletionItem(
                        x,
                        vscode.CompletionItemKind.EnumMember
                    )
                );
            }
        }

        //-------------------------------
        //立ち絵出場の表情
        //-------------------------------
        const matchEnt = line.match(/^<立ち絵:出場\/([a-z]+)\/([^>]*)$/);
        if (matchEnt) {
            const character = matchEnt[1];

            if (expressions[character]) {
                return expressions[character].map(x =>
                    new vscode.CompletionItem(
                        x,
                        vscode.CompletionItemKind.EnumMember
                    )
                );
            }
        }

        return [];
    }
}

module.exports = AutoComplete;