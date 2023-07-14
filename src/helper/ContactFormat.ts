export function formatContactString(to: string[]): string {
    let result = '';
    for (let i = 0; i < to.length; i++) {
        if (result == '') {
            result = to[i];
        } else {
            result = result + ', ' + to[i];
        }
    }
    return result;
}