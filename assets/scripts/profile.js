let img, icon, email, fullName, button;

img = document.querySelector('img');
icon = document.querySelector('i');
email = document.querySelector('.email');
fullName = document.querySelector('.name');
button = document.querySelector('button');

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