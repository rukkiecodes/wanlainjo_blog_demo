let img, icon, email, fullName, button, pictureDiv;

img = document.querySelector('img');
icon = document.querySelector('i');
email = document.querySelector('.email');
fullName = document.querySelector('.name');
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
        img.src = response.user.avatar
        icon.style.display = 'none'
        img.style.display = 'initial'
    }

    email.value = response.user.email
    fullName.value = response.user.name
})()

fullName.addEventListener('keypress', () => {
    if (fullName.value != response.user.name) button.disabled = false
    else button.disabled = true
})

fullName.addEventListener('blur', () => {
    if (fullName.value != response.user.name) button.disabled = false
    else button.disabled = true
})

button.addEventListener('click', async () => {
    if (fullName.value == response.user.name) return

    button.innerText = 'Loading...'
    let user = await fetch('https://wanlainjoblog-production.up.railway.app/auth/updateProfile', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: userData.email,
            name: fullName.value
        })
    })

    let updateResponse = await user.json()

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
        img.src = URL.createObjectURL(file)
        icon.style.display = 'none'
        img.style.display = 'initial'
    }
}