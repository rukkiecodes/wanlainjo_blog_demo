const postList = document.querySelector('.post-list');
const right = document.querySelector('.right');

(async () => {
    let posts = await fetch('https://wanlainjoblog-production.up.railway.app/post/getAllPosts', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
    })

    response = await posts.json()

    response.posts.forEach(post => {
        postList.innerHTML += `<div class="post">
                                    <div class="head">
                                        <div class="chip">
                                            <div class="avatar">
                                                <img src="${JSON.parse(post.currentUser).avatar}" alt="">
                                            </div>

                                            <span>${JSON.parse(post.currentUser).name}</span>
                                        </div>
                                    </div>

                                    <p class="postTite">${post.title}</p>

                                    <span class="postText">
                                        ${post.text.slice(0, 200)}
                                    </span>
                                    <span class="postText2">
                                        ${post.text}
                                    </span>
                                </div>`
    });

    const allPosts = document.querySelectorAll('.post');

    allPosts.forEach(post => {
        post.addEventListener('click', () => {
            right.innerHTML = post.outerHTML
        })
    })
})()