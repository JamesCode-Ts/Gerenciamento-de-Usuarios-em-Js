class User{


    constructor(formIdCreate, formIdUpdate, tableId){ /**O construtor é iniciado assim que a classe é instanciadas, ou seja, logo no inicio. */

    this.formEl = document.getElementById(formIdCreate);
    this.formUpdateEl = document.getElementById(formIdUpdate);
    this.tableEl = document.getElementById(tableId);

    this.onSubmit();

}


onSubmit(){

    this.formEl.addEventListener("submit", event => {

        event.preventDefault(); /**Cancela o carregamento padrão da atualização após apertar o submit. */

        this.getValues();

        this.addLine(user);
    });
}


getValues(){

let user = {};

/** Dessa forma é possivel transformar uma colecão em um array com [], e ... para que os elementos sejam indeterminados, ou seja , não se sabe quantos elementos tem. */
[...this.formEl.elements].forEach(function(field, index){ /** O forEach serve para percorrer todos os campos de name. 
                                          E oferece uma função como tratamento para cada campo name.*/

    if(field.name == "gender"){

    if(field.checked){

        user[field.name] = field.value;
    }

} else {

    user[field.name] = field.value;





    }
});

return new User(
    user.name,
    user.gender,
    user.birth,
    user.country,
    user.email,
    user.password,
    user.photo,
    user.admin
);

}


addLine(dataUser){
    
    this.tableEl.innerHTML = `
    
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
    
    
    
    
    
    }

}