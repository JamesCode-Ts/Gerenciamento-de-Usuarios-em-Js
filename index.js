var fiels = document.querySelectorAll("#form-user-create [name]");/** Seleciona todos os campos do formulário que tenha name. */
var user = {};


function addLine(dataUser){

var tr = document.createElement("tr"); /**cria o tr */


tr.innerHTML = `

<tr>
<td><img src="dist/img/user1-128x128.jpg" alt="User Image" class="img-circle img-sm"></td>
<td>${dataUser.name}</td>
<td>${dataUser.email}</td>
<td>${dataUser.admin}</td>
<td>${dataUser.birth}</td>
<td>
  <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
  <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
</td>
</tr>
`;

document.getElementById("table-users").appendChild(tr); /** Acrescendo o tr criado na tabela com os dados passados. */



}


document.getElementById("form-user-create").addEventListener("submit", function(event){

event.preventDefault(); /**Cancela o carregamento padrão da atualização após apertar o submit. */

fiels.forEach(function(field, index){ /** O forEach serve para percorrer todos os campos de name. 
                                          E oferece uma função como tratamento para cada campo name.*/

    if(field.name == "gender"){

    if(field.checked){

        user[field.name] = field.value;
    }

} else {

    user[field.name] = field.value;





    }
});

addLine(user);

});



