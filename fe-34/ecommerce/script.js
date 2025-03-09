setTimeout(()=>{
    
    document.getElementById("toggle-modal").click();
    

},3000);

const menuButton=document.getElementById('menuButton');
const menuContent=document.getElementById('menuContent');

menuButton.addEventListener('click',(e)=>{
    menuContent.classList.toggle('block');

});

const formSubmit=(formElement)=>{
    formElement.preventDefault()
    console.log(formElement)
}

