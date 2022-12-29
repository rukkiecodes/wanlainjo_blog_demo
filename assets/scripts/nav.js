const img = document.querySelector('.avatar img');
const  icon = document.querySelector('.avatar i');
const fullName = document.querySelector('.name');

let navResponse
let navUserData = JSON.parse(localStorage.wanlaingoBlogData).user;

(async () => {
    let user = await fetch('https://wanlainjoblog-production.up.railway.app/auth/profile', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: navUserData.email
        })
    })

    navResponse = await user.json()

    if (navResponse.user.avatar != undefined && navResponse.user.avatar != null) {
        img.src = navResponse.user.avatar
        icon.style.display = 'none'
        img.style.display = 'initial'
    }

    fullName.innerText = navResponse.user.name
})()

