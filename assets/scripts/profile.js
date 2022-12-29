let userAvatar, userIcon, email, userFullName, button, pictureDiv;

userAvatar = document.querySelector('.userAvatar');
userIcon = document.querySelector('.userIcon');
email = document.querySelector('.email');
userFullName = document.querySelector('.name');
button = document.querySelector('button');
pictureDiv = document.querySelector('.pictureDiv');

let response
let userData = JSON.parse(localStorage.wanlaingoBlogData).user;

(async () => {
    let user = await fetch('https://wanlainjoblog-production.up.railway.app/auth/profile', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: userData.email
        })
    })

    response = await user.json()

    if (response.user.avatar != undefined && response.user.avatar != null) {
        userAvatar.src = response.user.avatar
        userIcon.style.display = 'none'
        userAvatar.style.display = 'initial'
    }

    email.value = response.user.email
    userFullName.value = response.user.name
})()
































userFullName.addEventListener('keypress', () => {
    if (userFullName.value != response.user.name) button.disabled = false
    else button.disabled = true
})

userFullName.addEventListener('blur', () => {
    if (userFullName.value != response.user.name) button.disabled = false
    else button.disabled = true
})

button.addEventListener('click', async () => {
    if (userFullName.value == response.user.name) return

    button.innerText = 'Loading...'

    await fetch('https://wanlainjoblog-production.up.railway.app/auth/updateProfile', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: userData.email,
            name: userFullName.value
        })
    })

    button.innerText = 'Done'
    
    setTimeout(() => {
        button.innerText = 'Update Profile'
        button.disabled = true
    }, 2000)
    location.reload()
})


































pictureDiv.addEventListener('click', () => {
    let input = document.createElement('input')
    input.setAttribute('type', 'file')

    input.click()

    input.onchange = event => {
        const file = event.target.files[0]

        if (!file) return

        uploadImage(file)
    }
})

const uploadImage = async file => {
    const formData = new FormData()
    formData.append("avatar", file)
    formData.append("email", userData.email)

    let imageResponse = await fetch('https://wanlainjoblog-production.up.railway.app/auth/avatar', {
        method: 'post',
        body: formData
    })

    let response = await imageResponse.json()

    if (response.message == 'Avatar updated') {
        userAvatar.src = URL.createObjectURL(file)
        userIcon.style.display = 'none'
        userAvatar.style.display = 'initial'
    }
}