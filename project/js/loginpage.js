import {login, register} from "./api.js";

window.onload=function (){
    const signUpBtn = document.getElementById('signUp');
    const signInBtn = document.getElementById('signIn');
    const container = document.getElementById('container');
    const signUpSubmitBtn = document.getElementById('signUpSubmit')
    const signInSubmitBtn = document.getElementById('signInSubmit')

    signUpBtn.addEventListener('click', () => {
        container.classList.add('right-panel-active');
    });

    signInBtn.addEventListener('click', () => {
        container.classList.remove('right-panel-active');
    });

    signUpSubmitBtn.addEventListener('click',()=>{
        console.log(111111);
    });

    signInSubmitBtn.addEventListener('click',()=>{
        let signInUserName = document.getElementById('signInUserName').value;
        let signInPassword = document.getElementById('signInPassword').value;
        let loginData = {
            username:signInUserName,
            password:signInPassword,
        }
        login(loginData).then(function (response) {
            if(response.status===200){
                sessionStorage.setItem('username',signInUserName);
                window.location.href='index.html'
            }else{
                alert(response.data);
            }
        });
    });

    signUpSubmitBtn.addEventListener('click',()=>{
        let signUpUserName = document.getElementById('signUpUserName').value;
        let signUpPassword = document.getElementById('signUpPassword').value;
        let registryData = {
            username:signUpUserName,
            password:signUpPassword,
        }
        register(registryData).then(function (response) {
            alert(response.data)
        });
    });
}
