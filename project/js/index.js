import {briefInfo, changeIntroduction} from "./api.js";

window.onload = function ()
{
    var username = sessionStorage.getItem("username")
    let pname = document.getElementById("p-name")
    let pintroduction = document.getElementById("p-introduction")
    if(username==null){
        window.location.href='login.html'
    }
    pname.innerText=username
    briefInfo(username).then(response=>{
        let user = response.data
        sessionStorage.setItem("userId",user.id)
        pintroduction.value = user.introduction
    })

    let saveIntroductionBtn = document.getElementById("save-introduction")
    saveIntroductionBtn.addEventListener("click",()=>{
        changeIntroduction(sessionStorage.getItem("userId"),pintroduction.value).then(response=>{
            alert(response.data)
        })
    })
};

