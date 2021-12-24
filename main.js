const TextArea = document.getElementById("TextArea");
TextArea.value = localStorage.getItem("text");
TextArea.style.cssText = `height: ${TextArea.scrollHeight}px overflow-y: hidden`;
TextArea.style.height= "auto";
TextArea.style.height = `${this.scrollHeight}px`;
var type = "txt";
let input = document.getElementById("Load");
const nameInput = document.getElementById("name");
nameInput.value = "Notes";
input.addEventListener('change', () =>{
    let files = input.files;

    if(files.lenght == 0) return;

    const file = files[0];
    let reader = new FileReader();
    reader.onload = (e) => {
        const file = e.target.result;
        const lines = file.split(/\r\n|\n/);
        TextArea.value = lines.join('\n');
        localStorage.setItem("text", TextArea.value);
    };

    reader.onerror = (e) => alert(e.target.error.name);

    reader.readAsText(file);

});
function Txt(){
    type = "txt";
    document.getElementById("Txt").style.outline = "thick solid #299CA0";
    document.getElementById("Docx").style.outline = "none";
    document.getElementById("Odf").style.outline = "none";
}
function Docx(){
    type = "docx";
    document.getElementById("Txt").style.outline = "none";
    document.getElementById("Docx").style.outline = "thick solid #299CA0";
    document.getElementById("Odf").style.outline = "none";
}
function Odf(){
    type = "odf";
    document.getElementById("Txt").style.outline = "none";
    document.getElementById("Docx").style.outline = "none";
    document.getElementById("Odf").style.outline = "thick solid #299CA0";
}
function OpenDownload(){
    const downloadPanel = document.getElementById("Download2");
    downloadPanel.style.display = "inline";
    downloadPanel.style.opacity = "1";
}
function CloseDownload(){
    const downloadPanel = document.getElementById("Download2");
    downloadPanel.style.display = "none";
    downloadPanel.style.opacity = "0";
}
function download(){
    var text = TextArea.value;
    var file = new File([text], nameInput.value+ "." + type, {type: "text/plain: charset=utf-8"});
    var url = window.URL.createObjectURL(file);
    var elem = document.createElement("a");
    elem.style.display = "none";
    elem.href = url;
    elem.download = file.name;
    elem.click();
    window.URL.revokeObjectURL(url);
    CloseDownload();
}

TextArea.addEventListener("input", function(){
    this.style.height= "auto";
    this.style.height = `${this.scrollHeight}px`;
    localStorage.setItem("text", TextArea.value);
});
