export function parseTextAsHtml(text){

    var lines = text.split('\n');
    console.log('lines ', lines)
    var finalText = "<p>";
    for(let line of lines){
        if(line.length==0){
            finalText = finalText + "<br>"
        }else{
            finalText= finalText + line+"<br>"
        }
        
    }

    return finalText

}