// //SELECT ACTIVE FILTR

const field = document.getElementById('fields');
const searchInp = document.querySelector('.search');
const searchBtn = document.querySelector('.searchBtn');

const search = () => {
    const searchInpLetter = [... searchInp.value][0];
    const fieldLetter = [... field.value][0];
    users.innerHTML = '';
    db.collection("users").where(`${field.value}`,'==',`${searchInp.value}`).get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
            let div = document.createElement('div');
            let cross = document.createElement('span');
            cross.textContent = 'x';
            cross.classList.add('cross');
            let view = document.createElement('button');
            view.classList.add('transparent');
            view.innerHTML = '<img src="./images/user.svg"><span>View full profile</span>';
            view.addEventListener('click', () => {
                profile.classList.add('active');
                profile.setAttribute('data-id', doc.id);
                profile.innerHTML = 
                `
                <img class="profileImage" src=${doc.data().Image} alt="Profile Image">
                <div class='first'>First Name: <span>${doc.data().First_Name}</span></div>
                <div class='last'>Last Name: <span>${doc.data().Last_Name}</span></div>
                <div class='email'>Email: <span>${doc.data().Email}</span></div>
                <div class='phone'>Phone Number: <span>${doc.data().Phone_Number}</span></div>
                <div class='description'><p>${doc.data().Description}</p></div>
                `
            })
            //EDIT TURN ON
            let edit = document.createElement('span');
            edit.classList.add('editBtn');
            edit.innerHTML = '<i class="fas fa-edit"></i>';
            edit.addEventListener('click', () => {
                document.querySelector('.edit').classList.add('active');
                edit.parentElement.classList.add('editElement');
                document.querySelector('.edit').classList.add('active');
                document.body.classList.add('active');
                document.querySelector('.editFName').value = `${doc.data().First_Name}`
                document.querySelector('.editLName').value = `${doc.data().Last_Name}`
                document.querySelector('.editEmail').value = `${doc.data().Email}`
                document.querySelector('.editPhone').value = `${doc.data().Phone_Number}`
                document.querySelector('.editDescription').value = `${doc.data().Description}`
                document.querySelector('.editImage').value = `${doc.data().Image}`
            })
            
            //DEL
            
            cross.addEventListener('click', (e) => {
                e.stopPropagation;
                let id = e.target.parentElement.getAttribute('data-id');
                db.collection('users').doc(id).delete();
                cross.parentElement.parentElement.removeChild(cross.parentElement);
            })

            //
            users.appendChild(div);
            div.setAttribute('data-id', doc.id);
            div.classList.add('profil');
            let info = document.createElement('div');
            let name = document.createElement('div');
            let cont = document.createElement('div');
            info.classList.add("info");
            name.classList.add("name");
            cont.classList.add('cont');
            name.innerHTML = `${doc.data().First_Name} ${doc.data().Last_Name}`
            cont.innerHTML = `
                <a class='phone' href="tel:${doc.data().Phone_Number}"><img src="./images/phone.svg"> Call</a>
                <a class='email' href="mailto:${doc.data().Email}"><img src="./images/email.svg"> Email</a>
                `
            cont.appendChild(view);
            info.appendChild(name);
            info.appendChild(cont);
            div.innerHTML = 
            `<img class="profileImage" src=${doc.data().Image} alt="Profile Image">`;
            div.appendChild(info);
            div.appendChild(cross);
            div.appendChild(edit);
        })
      })
      searchInp.value = ''
      
}

searchBtn.addEventListener('click', search);

//RESET

document.querySelector('.reset').addEventListener('click', getUsers);