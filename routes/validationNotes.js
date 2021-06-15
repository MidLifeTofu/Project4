// possibly use following validation with some tweaking for different info.


document.addEventListener("DOMContentLoaded", () => {
    
    const formButton = document.querySelector("form")
    const formEmail = document.querySelector("#address");
    const formName = document.querySelector("#name");
    const formSurname = document.querySelector("#surname");
    

       formButton.onsubmit = (e) => {
           e.preventDefault()
           
           console.log("hello")

            //name validation
        const nameValid = /^[A-Za-zÀ-ÖØ-öø-ÿ \-']+$/i.test(formName.value)
/*             console.log(nameValid.test(formName.value)) */
            if (nameValid === true) { 
                console.log("Name is valid!")
            } else {
                console.log("That's not a valid name")
            }

        const surnameValid = /^[A-Za-zÀ-ÖØ-öø-ÿ \-']+$/i.test(formSurname.value)
/*             console.log(surnameValid.test(formSurname.value)) */
            if (surnameValid === true) { 
                console.log("Surname is valid!")
            } else {
                console.log("That's not a valid surname")
            }
        
            //email validation
        const emailValid = /^[a-zA-Z0-9\-_]+[a-zA-Z0-9\-_\.]*@[a-zA-Z0-9\-_]+\.[a-zA-Z0-9\-_\.]+$/.test(formEmail.value)

            if (emailValid === true) { 
                console.log("Email is valid!")
            } else {
                console.log("That's not a valid email")
            }
            //validation test, if all are valid, present requested info
            if (nameValid && surnameValid && emailValid) {
                modal.style.display = "block";
                console.log({
                    Name: formName.value,
                    Surname: formSurname.value,
                    Email: formEmail.value
                })
            } else {
                console.log("Something is not valid")
        }
       }
    })