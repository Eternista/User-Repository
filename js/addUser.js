//ADD TURN ON/OFF

document.querySelector('.openAdd').addEventListener('click', () => {
    document.getElementById('form').classList.add('active');
})

document.querySelector('.closeAdd').addEventListener('click', () => {
    document.getElementById('form').classList.remove('active');
})

document.getElementById('form').addEventListener('click', (e) => {
    if(e.target.classList.contains('active')) {
        document.getElementById('form').classList.remove('active');
    }
})

//CREATE USER AND ADDING TO FIREBASE

const addUser = () => {
    const first = document.getElementById('firstName').value;
    const last = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const image = document.getElementById('image').value; 
    const description = document.getElementById('description').value;

    if(first === '' || last === '' || email === "" || phone === '' || image === '' || description === ''){
        alert('Field is empty');
    } else {
        db.collection("users").doc().set({
            First_Name: first,
            Last_Name: last,
            Email: email,
            Phone_Number: phone,
            Description: description,
            Image: image
          })
          .then(() => {
              console.log("Document successfully written!");
          })
          .catch((error) => {
              console.error("Error writing document: ", error);
          });
          getUsers();
          document.getElementById('firstName').value = "";
          document.getElementById('lastName').value = "";
          document.getElementById('email').value = "";
          document.getElementById('phone').value = "";
          document.getElementById('description').value = "";
          document.getElementById('image').value = "";
          document.getElementById('form').classList.remove('active');
    }
} 
document.getElementById('add').addEventListener('click', addUser);