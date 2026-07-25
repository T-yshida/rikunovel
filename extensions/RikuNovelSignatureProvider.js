const vscode = require("vscode");

class RikuNovelSignatureProvider {
    provideSignatureHelp(document, position) {
        const line = document.lineAt(position.line).text.substring(0, position.character);

        const match = line.match(/<([^:>]+):([^>]*)$/);

        if (!match)
            return null;

        const command = match[1];
        const argsText = match[2];

        const args = argsText.split('/');

        const help = new vscode.SignatureHelp();

        //----------------------------------
        // 選択肢
        //----------------------------------
        if (command === "選択肢") {
            const sig = new vscode.SignatureInformation(
                "選択肢(選択肢1, 選択肢2, ...)"
            );

            sig.parameters = [
                new vscode.ParameterInformation("選択肢1"),
                new vscode.ParameterInformation("選択肢2")
            ];

            help.signatures = [sig];
            help.activeParameter = Math.max(args.length - 1, 0);

            return help;
        }

        //----------------------------------
        // 値変化
        //----------------------------------
        if (command === "値変化") {
            const sig = new vscode.SignatureInformation(
                "値変化(変数名, 値)"
            );

            sig.parameters = [
                new vscode.ParameterInformation("変数名"),
                new vscode.ParameterInformation("値 (数値 または true/false)")
            ];

            help.signatures = [sig];
            help.activeParameter = Math.min(args.length - 1, 1);

            return help;
        }

        //----------------------------------
        // フェード
        //----------------------------------
        if (command === "フェードイン" || command === "フェードアウト") {
            const sig = new vscode.SignatureInformation(
                `${command}(秒数)`
            );

            sig.parameters = [
                new vscode.ParameterInformation("秒数")
            ];

            help.signatures = [sig];
            help.activeParameter = 0;

            return help;
        }

        //----------------------------------
        // 立ち絵
        //----------------------------------
        if (command === "立ち絵") {
            const action = args[0];

            let sig = null;

            switch (action) {
                case "出場":
                    sig = new vscode.SignatureInformation(
                        "出場(キャラ名, 立ち絵名, 初期位置, 初期サイズ)"
                    );

                    sig.parameters = [
                        new vscode.ParameterInformation("出場"),
                        new vscode.ParameterInformation("キャラ名 (小文字ローマ字)"),
                        new vscode.ParameterInformation("立ち絵名 (大文字英語)"),
                        new vscode.ParameterInformation("初期位置 (例: 0,0)"),
                        new vscode.ParameterInformation("初期サイズ (倍率)")
                    ];
                    break;

                case "移動":
                    sig = new vscode.SignatureInformation(
                        "移動(キャラ名, 移動先位置, サイズ, 秒数)"
                    );

                    sig.parameters = [
                        new vscode.ParameterInformation("移動"),
                        new vscode.ParameterInformation("キャラ名"),
                        new vscode.ParameterInformation("移動先位置 (例: 0,0)"),
                        new vscode.ParameterInformation("サイズ"),
                        new vscode.ParameterInformation("秒数")
                    ];
                    break;

                case "退場":
                    sig = new vscode.SignatureInformation(
                        "退場(キャラ名)"
                    );

                    sig.parameters = [
                        new vscode.ParameterInformation("退場"),
                        new vscode.ParameterInformation("キャラ名")
                    ];
                    break;

                case "立ち絵変更":
                    sig = new vscode.SignatureInformation(
                        "立ち絵変更(キャラ名, 立ち絵名)"
                    );

                    sig.parameters = [
                        new vscode.ParameterInformation("立ち絵変更"),
                        new vscode.ParameterInformation("キャラ名"),
                        new vscode.ParameterInformation("立ち絵名")
                    ];
                    break;

                default:
                    sig = new vscode.SignatureInformation(
                        "立ち絵(出場, 移動, 退場, 立ち絵変更)"
                    );

                    sig.parameters = [
                        new vscode.ParameterInformation("操作")
                    ];
                    break;
            }

            help.signatures = [sig];
            help.activeParameter = Math.min(args.length - 1, sig.parameters.length - 1);

            return help;
        }

        //----------------------------------
        // 背景
        //----------------------------------
        if (command === "背景") {
            const sig = new vscode.SignatureInformation(
                "背景(背景番号)"
            );

            sig.parameters = [
                new vscode.ParameterInformation("背景番号")
            ];

            help.signatures = [sig];
            help.activeParameter = 0;

            return help;
        }

        //----------------------------------
        // エンド
        //----------------------------------
        if (command === "エンド") {
            const sig = new vscode.SignatureInformation(
                "エンド(場所, 要素番号)"
            );

            sig.parameters = [
                new vscode.ParameterInformation("場所 (例: HOME)"),
                new vscode.ParameterInformation("要素番号")
            ];

            help.signatures = [sig];
            help.activeParameter = Math.min(args.length - 1, 1);

            return help;
        }

        //----------------------------------
        // 特殊フラグ
        //----------------------------------
        if (command === "特殊フラグ") {
            const sig = new vscode.SignatureInformation(
                "特殊フラグ(場所, 要素番号)"
            );

            sig.parameters = [
                new vscode.ParameterInformation("場所 (HOME, SHOPPING...)"),
                new vscode.ParameterInformation("要素番号")
            ];

            help.signatures = [sig];
            help.activeParameter = Math.min(args.length - 1, 1);

            return help;
        }

        //----------------------------------
        // 音楽
        //----------------------------------
        if (command === "音楽") {
            const sig = new vscode.SignatureInformation(
                "音楽(楽曲名 または STOP/REPLAY/PARSE)"
            );

            sig.parameters = [
                new vscode.ParameterInformation("楽曲名")
            ];

            help.signatures = [sig];
            help.activeParameter = 0;

            return help;
        }

        //----------------------------------
        // 鬱モード
        //----------------------------------
        if (command === "鬱モード") {
            const sig = new vscode.SignatureInformation(
                "鬱モード(値)"
            );

            sig.parameters = [
                new vscode.ParameterInformation("0~1までの小数点"),
            ];

            help.signatures = [sig];
            help.activeParameter = Math.min(args.length - 1, 1);

            return help;
        }

        return null;
    }


}

module.exports = RikuNovelSignatureProvider;