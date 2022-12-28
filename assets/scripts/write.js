const postButton = document.querySelector('.postButton')
const postBody = document.querySelector('.postBody')
const title = document.querySelector('.title')

let writeUserData = JSON.parse(localStorage.wanlaingoBlogData).user;


postButton.addEventListener('click', async () => {
    if (postBody.value == '') {
        alert('Please write something')
    } else {
        postButton.innerText = 'Posting...'

        let post = await fetch('https://wanlainjoblog-production.up.railway.app/post/addPost', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: writeUserData.email,
                text: postBody.value,
                title: title.value
            })
        })

        let response = await post.json()

        postButton.innerText = 'Post saved!'
        setTimeout(() => {
            postButton.innerText = 'Save Post'
            postBody.value = ''
            title.value = ''
        }, 2000)
    }
})