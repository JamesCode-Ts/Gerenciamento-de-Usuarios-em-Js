class UserController {


    constructor(formIdCreate, tableId) { /**O construtor é iniciado assim que a classe é instanciadas, ou seja, logo no inicio. */

        this.formEl = document.getElementById(formIdCreate);
        this.tableEl = document.getElementById(tableId);

        this.onSubmit();
        this.onEdit();

    }
    onEdit(){

        document.querySelector("#box-user-update .btn-cancel").addEventListener("click", e=>{

            this.showPanelCreate();

        });

    }


    onSubmit() {

        this.formEl.addEventListener("submit", event => {

            event.preventDefault(); /**Cancela o carregamento padrão da atualização após apertar o submit. */

            let values = this.getValues();

            let btn = this.formEl.querySelector("[type=submit]");

            btn.disable = true;
             
            if(!values) return false;

            this.getPhoto().then(
                (content) => { // recebe o retorno do callback e armazena no content.

                    values.photo = content;

                    this.addLine(values); // adiciona a foto na linha

                    this.formEl.reset();

                    btn.disable = false;


                },
                (e) => {
                    console.error(e);

                });




        });
    }




    getPhoto() {

        return new Promise((resolve, reject) => {

            let fileReader = new FileReader();

            let elements = [...this.formEl.elements].filter(item => { // filtra só aonde esta o campo da foto

                if (item.name === 'photo') {

                    return item;

                }

            });


            let file = elements[0].files[0]; // O campo onde esta a foto com ela já carregada.

            fileReader.onload = () => { /** Quando terminar de carregar a foto executa o callback, função assíncrona.*/

                resolve(fileReader.result); /** O resulado vai vim na base64 */

            };

            fileReader.onerror = (e) => {

                reject(e);
            }

            if (file) {
                fileReader.readAsDataURL(file);
            } else {
                resolve('dist/img/boxed-bg.jpg');
            }// ler e carrega a foto
        });

    }
    getValues() {
        
        let user = {};
        let isValid = true;

        /** Dessa forma é possivel transformar uma colecão em um array com [], e ... para que os elementos sejam indeterminados, ou seja , não se sabe quantos elementos tem. */
        [...this.formEl.elements].forEach(function (field, index) { /** O forEach serve para percorrer todos os campos de name. 
                                          E oferece uma função como tratamento para cada campo name.*/

            if (['name', 'email', 'password'].indexOf(field.name) > -1 && !field.value) {
                field.parentElement.classList.add('has-error');
                isValid = false;

            }



            if (field.name == "gender") {

                if (field.checked) {

                    user[field.name] = field.value;
                }

            } else if (field.name == "admin") {

                user[field.name] = field.checked;

            } else {

                user[field.name] = field.value;
            }
        });


        if (!isValid) {
            return false;
        }


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


    addLine(dataUser) {

        let tr = document.createElement('tr');

        /** dataset permite adicionar(armazenar) atributos via HTML, onde os dados ficam carregados. */

        tr.dataset.user = JSON.stringify(dataUser); /** Tranforma os valores que esta no objeto em um JSON, ou seja um string. */

        tr.innerHTML = `
    
    <tr>
    <td><img src="${dataUser.photo}" alt="User Image" class="img-circle img-sm"></td>
    <td>${dataUser.name}</td>
    <td>${dataUser.email}</td>
    <td>${(dataUser.admin) ? 'Sim' : 'Não'}</td>
    <td>${Utils.dateFormat(dataUser.register)}</td>
    <td>
    <button type="button" class="btn btn-primary btn-edit btn-xs btn-flat">Editar</button>
    <button type="button" class="btn btn-danger btn-delete btn-xs btn-flat">Excluir</button>
    </td>
    </tr>
    
    `;

     tr.querySelector(".btn-edit").addEventListener("click", e=>{

        let json = JSON.parse(tr.dataset.user);
        let form = document.querySelector("#form-user-update");


        for(let name in json){

            let field = form.querySelector("[name=" + name.replace("_","") +"]");

            if(field){

                if(field.type =='file') continue;

                field.value = json[name];
            }
        }

        this.showPanelUpdate();
     });


        this.tableEl.appendChild(tr);

        this.updateCount();

    }

    showPanelCreate(){

        document.querySelector("#box-user-create").style.display = "block";
        document.querySelector("#box-user-update").style.display = "none";

    }

    showPanelUpdate() {

        document.querySelector("#box-user-create").style.display = "none";
        document.querySelector("#box-user-update").style.display = "block";

    }

    updateCount(){

        let numberUsers = 0;
        let numberAdmin = 0;

     [...this.tableEl.children].forEach(tr=>{

        numberUsers++;

        let user = JSON.parse(tr.dataset.user); /** Tranfrma os valores que foi tranformado em JSON novamente em um objeto. */


        if(user._admin) numberAdmin++;


   });

   document.querySelector("#number-users").innerHTML = numberUsers;
   document.querySelector("#number-users-admin").innerHTML = numberAdmin;






    }

}