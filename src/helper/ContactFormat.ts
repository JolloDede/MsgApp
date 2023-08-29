export function formatContactString(to: User): string {
    let result = '';
    // for (let i = 0; i < to.length; i++) {
    //     if (result == '') {
    //         result = to[i].username;
    //     } else {
    //         result = result + ', ' + to[i].username;
    //     }
    // }
    result = to.username;
    return result;
}