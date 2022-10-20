var fiels = document.querySelectorAll("#form-user-create [name]");/** Seleciona todos os campos do formulário que tenha name. */
var user = {};


document.getElementById("form-user-create").addEventListener("submit", function(event){

event.preventDefault(); /**Cancela o carregamento padrão da atualização após apertar o submit. */

fiels.forEach(function(field, index){ 

    if(field.name == "gender"){

    if(field.checked){

        user[field.name] = field.value;
    }

} else {

    user[field.name] = field.value;





    }
});

console.log(user);

});



