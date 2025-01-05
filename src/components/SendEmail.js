import Swal from 'sweetalert2'; 
const form = document.getElementById("form");
const name = document.getElementById("name");
const email = document.getElementById("email");
const phoneNumber = document.getElementById("phoneNumber");
const comment = document.getElementById("comment");


function sendEmail() {
    const bodyMessage = `Name : ${name.value}<br> Email : ${email.value}<br> phone Number : ${phoneNumber.value}<br> comment : ${comment.value}`

    Email.send({
        Host : "smtp.elasticemail.com",
        auth :{
        Username : "skinsaviour24@gmail.com",
        Password : "FA1CD2C7BBEE68184579FD0873641D0C6BA8",
        To : "skinsaviour24@gmail.com",
        Body : bodyMessage
        }
    }).then((message) => {
        if (message === "OK") {
          Swal.fire({
            title: "Good Job!",
            text: "Your comment has been successfully sent",
            icon: "success",
          });
        } else {
          Swal.fire({
            title: "Error!",
            text: "There was an issue sending the email",
            icon: "error",
          });
        }
      });
}

form.addEventListener("submit" , (e) => {
    e.preventDefault();

    sendEmail();

});