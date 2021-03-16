//GET USERS FROM FIREBASE

const users = document.getElementById('users');
const profile = document.getElementById('profile');

const getUsers = () => {
    users.innerHTML = '';
    db.collection("users").get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
            
            //CREATING ELEMENTS
            
            let div = document.createElement('div');
            let cross = document.createElement('span');
            let close = document.createElement("span");
            let firstName = document.createElement('div');
            firstName.classList.add('first','single');
            firstName.innerHTML = `First Name: <input value="${doc.data().First_Name}"  disabled> <i class="fas fa-edit"></i>`;
            let lastName = document.createElement('div');
            lastName.classList.add('last','single');
            lastName.innerHTML = `Last Name: <input value="${doc.data().Last_Name}"  disabled> <i class="fas fa-edit"></i>`;
            let email = document.createElement('div');
            email.classList.add('email','single');
            email.innerHTML = `Email: <input value="${doc.data().Email}"  disabled> <i class="fas fa-edit"></i>`;
            let phone = document.createElement('div');
            phone.classList.add('phone','single');
            phone.innerHTML = `Phone Number: <input value="${doc.data().Phone_Number}"  disabled> <i class="fas fa-edit"></i>`;
            let description = document.createElement('div');
            description.classList.add('description','single');
            description.innerHTML =`Description: <textarea disabled>${doc.data().Description}</textarea><i class="fas fa-edit"></i>`;
            let image = document.createElement('img');
            image.src = `${doc.data().Image}`
            close.innerHTML = '<i class="fas fa-times-circle"></i>';
            close.classList.add('close');
            cross.textContent = 'Remove';
            cross.classList.add('cross');
            let removeModal = document.createElement('div');
            let removeBtn = document.createElement('button');
            let returnBtn = document.createElement('button');
            returnBtn.classList.add('returnButton');
            returnBtn.textContent = "No";
            removeBtn.textContent = 'Yes';
            removeBtn.classList.add('removeButton');
            removeModal.classList.add('removeModal');
            removeModal.innerHTML = 
            `
            <h4>Are You sure?</h4>
            `
            removeModal.appendChild(removeBtn);
            removeModal.appendChild(returnBtn);
            let view = document.createElement('button');
            view.classList.add('transparent');
            view.innerHTML = '<img src="./images/user.svg"><span>View full profile</span>';

            //VIEW  SINGLE USER

            view.addEventListener('click', () => {
                view.parentElement.parentElement.parentElement.classList.add('viewElement');
                profile.classList.add('activeProfile');
                profile.setAttribute('data-id', doc.id);
                profile.innerHTML =
                `
                <div class="fullContent">
                    <img src=${doc.data().Image}>
                    <div class="profileContent">
                        <h3>${doc.data().First_Name} ${doc.data().Last_Name}</h3>
                        <div class="space"></div>
                    </div>
                </div>
                `;
                profile.children[0].children[1].children[1].appendChild(firstName);
                profile.children[0].children[1].children[1].appendChild(lastName);
                profile.children[0].children[1].children[1].appendChild(email);
                profile.children[0].children[1].children[1].appendChild(phone);
                profile.children[0].children[1].children[1].appendChild(description);
                profile.children[0].appendChild(close);
                profile.children[0].appendChild(cross);
                profile.children[0].appendChild(removeModal);
                let startEdit = document.createElement('button');
                startEdit.classList.add('editBtn');
                startEdit.textContent = 'Edit';
                profile.children[0].children[1].appendChild(startEdit);
                const single = [... document.querySelectorAll('.single .fa-edit')];
                single.forEach((e) => {
                    e.classList.add('none');
                    startEdit.addEventListener('click', () => {
                        e.classList.toggle('none');
                        if(startEdit.textContent ==='Edit') {
                            setTimeout(function(){
                                startEdit.textContent = 'Stop';
                                [... document.querySelectorAll('.single *:not(.fas)')].forEach(single => {
                                    single.addEventListener('click', function(){
                                        single.classList.add('editing');
                                    })
                                });
                                document.querySelector('.first input').classList.add('editable');
                                document.querySelector('.last input').classList.add('editable');
                                document.querySelector('.phone input').classList.add('editable');
                                document.querySelector('.email input').classList.add('editable');
                                document.querySelector('.description textarea').classList.add('editable');
                                document.querySelector('.first input').removeAttribute('disabled');
                                document.querySelector('.last input').removeAttribute('disabled');
                                document.querySelector('.phone input').removeAttribute('disabled');
                                document.querySelector('.email input').removeAttribute('disabled');
                                document.querySelector('.description textarea').removeAttribute('disabled');
                                e.addEventListener('click', () => {
                                    [... document.querySelectorAll('.single *:not(.fas)')].forEach(single => {
                                        single.classList.remove('editing');
                                    });
                                    if(e.parentNode.textContent === document.querySelector('.first').textContent) {
                                        db.collection("users").doc(`${document.getElementById('profile').getAttribute('data-id')}`).update({
                                            First_Name: e.parentNode.children[0].value,
                                        })
                                    }else if(e.parentNode.textContent === document.querySelector('.last').textContent) {
                                        db.collection("users").doc(`${document.getElementById('profile').getAttribute('data-id')}`).update({
                                            Last_Name: e.parentNode.children[0].value,
                                        })
                                    }else if(e.parentNode.textContent === document.querySelector('.phone').textContent) {
                                        db.collection("users").doc(`${document.getElementById('profile').getAttribute('data-id')}`).update({
                                            Phone_Number: e.parentNode.children[0].value,
                                        })
                                    }else if(e.parentNode.textContent === document.querySelector('.email').textContent) {
                                        db.collection("users").doc(`${document.getElementById('profile').getAttribute('data-id')}`).update({
                                            Email: e.parentNode.children[0].value,
                                        })
                                    }else if(e.parentNode.textContent === document.querySelector('.description').textContent) {
                                        db.collection("users").doc(`${document.getElementById('profile').getAttribute('data-id')}`).update({
                                            Description: e.parentNode.children[0].value,
                                        })
                                    }
                                })
                            },100)
                        } else if(startEdit.textContent === 'Stop') {
                            setTimeout(function(){
                                startEdit.textContent = 'Edit';
                                [... document.querySelectorAll('.single input')].forEach(single => {
                                    single.classList.remove('editable');
                                });
                                document.querySelector('.description textarea').classList.remove('editable');
                                if(document.querySelector('.first input').classList.contains('editing')) {
                                    document.querySelector('.first input').classList.remove('editing');
                                    document.querySelector('.first input').setAttribute('disabled', '');
                                    document.querySelector('.first input').value = `${doc.data().First_Name}`;
                                } else {
                                    document.querySelector('.first input').setAttribute('disabled', '');
                                    document.querySelector('.first input').classList.remove('editing');
                                }
                                if(document.querySelector('.last input').classList.contains('editing')) {
                                    document.querySelector('.last input').classList.remove('editing');
                                    document.querySelector('.last input').setAttribute('disabled', '');
                                    document.querySelector('.last input').value = `${doc.data().Last_Name}`;
                                } else {
                                    document.querySelector('.last input').setAttribute('disabled', '');
                                    document.querySelector('.last input').classList.remove('editing');
                                }
                                if(document.querySelector('.email input').classList.contains('editing')) {
                                    document.querySelector('.email input').setAttribute('disabled', '');
                                    document.querySelector('.email input').classList.remove('editing');
                                    document.querySelector('.email input').value = `${doc.data().Email}`;
                                } else {
                                    document.querySelector('.email input').setAttribute('disabled', '');
                                }
                                if(document.querySelector('.phone input').classList.contains('editing')) {
                                    document.querySelector('.phone input').classList.remove('editing');
                                    document.querySelector('.phone input').setAttribute('disabled', '');
                                    document.querySelector('.phone input').value = `${doc.data().Phone_Number}`;
                                } else {
                                    document.querySelector('.phone input').setAttribute('disabled', '');
                                    document.querySelector('.phone input').classList.remove('editing');
                                }
                                if(document.querySelector('.description textarea').classList.contains('editing')){
                                    document.querySelector('.description textarea').classList.remove('editing');
                                    document.querySelector('.description textarea').setAttribute('disabled', '');
                                    document.querySelector('.description textarea').value = `${doc.data().Description}`;
                                }
                                else {
                                    document.querySelector('.description textarea').setAttribute('disabled', '');
                                    document.querySelector('.description textarea').classList.remove('editing');
                                }

                                }, 100)
                        }
                    })
                })
                profile.addEventListener('click', (e) => {
                    if(e.target.classList.contains('activeProfile')){
                        profile.classList.remove('activeProfile');
                        document.querySelector('.viewElement').classList.remove('viewElement');
                    }
                })
                close.addEventListener('click', (e) => {
                    profile.classList.remove('activeProfile');
                    document.querySelector('.viewElement').classList.remove('viewElement');
                })
                //DELETE USER
            
                cross.addEventListener('click', (e) => {
                    removeModal.classList.add("active");
                })

                removeBtn.addEventListener('click', (e) => {
                    e.stopPropagation;
                    let id = document.querySelector('.viewElement').getAttribute('data-id');
                    db.collection('users').doc(id).delete();
                    removeModal.classList.remove('active');
                    profile.classList.remove('activeProfile');
                    document.querySelector('.viewElement').parentNode.removeChild(document.querySelector('.viewElement'));
                })
                returnBtn.addEventListener('click', (e) => {
                    removeModal.classList.remove('active');
                })
            })
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
        })
      })
      
}

getUsers();