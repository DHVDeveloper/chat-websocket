export function copyToClipBoard(textToCopy:string){
    navigator.clipboard.writeText(textToCopy);
}