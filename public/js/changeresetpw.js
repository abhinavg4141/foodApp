let ChangepwBtn = document.querySelector("#change-password-btn");
let pw = document.querySelector(".password-reset");
let cpw = document.querySelector(".Password-cfrm");
let message = document.querySelector("#message-password");

function myfunction(){
    preloader.style.display="none";
  }

ChangepwBtn.addEventListener("click",async function(e){
    e.preventDefault();
    try{
        e.preventDefault(); // prevent page refresh

        if(pw.value&&cpw.value && pw.value == cpw.value){
            let token = document.URL.split("/");
            token = token[token.length-1];
            // console.log(token);
            let obj = await axios.patch( `https://eat-beast.herokuapp.com/api/users/resetpassword/${token}` , {password:pw.value , confirmPassword:cpw.value});
            console.log(obj);
            pw.value="";
            cpw.value=""
            if(obj.data.message){
                window.location.href = "/login";
            }else{
                message.innerHTML = obj.data.message;
                window.location.href = "/login";
            }
        }else{
            message.innerHTML = "Password didn't Match";
            pw.value="";
            cpw.value="";
        }

    }
    catch(error){
        console.log(error);
    }
})