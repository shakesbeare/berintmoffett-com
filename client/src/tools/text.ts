export const kebabCaseToTitleCase = (str: string) => {
    return str.split('-')
        .map((w) => {
            let chars = w.split('');
            chars[0] = chars[0].toUpperCase();

            return chars.join("");
        }).join(" ");
}

