const messageContainer = $(".message-container");
const messageSend = $("#content");
const sendButton = $("#send");
// const toggleBtn = $("#toggle-btn");
// const sideMenu = $(".side-menu");
// const closeBtn = $("#close-btn");
// const login = $("#login");
// const loginModal = $(".login-modal");
// const modalBack = $(".login-modal-background");
// const submit = $('#submit');
// const id = $('#id');
// const pw = $('#pw');

// login.click(function (e) {
//     loginModal.css('opacity', '1');
//     modalBack.css('opacity', '1');
//     loginModal.css('visibility', 'visible');
//     modalBack.css('visibility', 'visible');
// })

// if (getCookie("AccessToken")) {
//     login.html("Logout");
//     login.click(function (e) {
//         deleteCookie("AccessToken");
//         location.reload();
//     })
//
//     $.ajax({
//         type: "GET",
//         url: config.serverUrl + "/api/log",
//         headers: {
//             "authorization": "Bearer " + getCookie("AccessToken")
//         }
//     }).then((res) => {
//         res.data.forEach(m => {
//             let userTemplate = `<div class="message user">
//                 <div class="message-inner">
//                     <div class="text">
//                         <p>${m.question}</p>
//                     </div>
//                     <div class="profile">
//                         <span class="profile-inner">
//                             <i class="fa-solid fa-user fa-2x"></i>
//                         </span>
//                     </div>
//                 </div>
//                 <div style="float: none; clear: both" class="end"></div>
//             </div>`;
//
//             m.answer =  m.answer.replace(`{"answer":"`, "");
//             m.answer = m.answer.replaceAll('"}', "");
//             let botTempalte = `<div class="message bot">
//                 <div class="message-inner">
//                     <div class="profile">
//                         <span class="profile-inner">
//                            <i class="fa-solid fa-dna fa-2x"></i>
//                         </span>
//                     </div>
//                     <div class="text">
//                         <p>${m.answer}</p>
//                     </div>
//                     <div style="float: none; clear: both" class="end"></div>
//                 </div>
//             </div>`;
//
//             messageContainer.append(userTemplate);
//             messageContainer.append(botTempalte);
//         })
//
//         let messages = $(".end");
//         window.scrollTo(0, messages.eq(messages.length - 1).offset().top);
//     })
// }
//
// modalBack.click(function (e) {
//     loginModal.css('opacity', '0');
//     modalBack.css('opacity', '0');
//     setTimeout(function () {
//         loginModal.css('visibility', 'hidden');
//         modalBack.css('visibility', 'hidden');
//     }, 1000);
// })
// toggleBtn.on('click', function (e) {
//     sideMenu.css('transform', 'translateX(0)')
// });
//
// closeBtn.on('click', function (e) {
//     sideMenu.css('transform', 'translateX(300px)')
// })

// submit.on('click', function (e) {
//     if (id.val().length > 0 && pw.val().length > 0) {
//         const name = id.val().toString();
//         const pass = pw.val().toString();
//         const data = {
//             username: name,
//             password: pass
//         };
//         console.log(name);
//         console.log(pass);
//
//         fetch(config.serverUrl + "/login", {
//             method: "POST",
//             body: JSON.stringify(data),
//         }).then(res => {
//             console.log(res.headers.get("Authorization"));
//             const token = res.headers.get("Authorization").replace("Bearer ", "")
//             setCookie("AccessToken", token, 60);
//             location.reload();
//         }).catch(err => {
//             console.log(err);
//         })
//     }
// })

messageSend.on('keydown', (e) => {
    if (e.keyCode === 13 && !(sendButton.prop("disabled"))) {
        e.preventDefault();
        sendButton.click();
    }
})

sendButton.click(() => {
    if (messageSend.val().length != 0) {
        const content = messageSend.val()

        let userTemplate = `<div class="message user">
                <div class="message-inner">
                    <div class="text">
                        <p>${content}</p>
                    </div>
                    <div class="profile">
                        <span class="profile-inner">
                            <i class="fa-solid fa-user fa-2x"></i>
                        </span>
                    </div>
                </div>
                <div style="float: none; clear: both"></div>
            </div>`;

        messageSend.val("");
        messageContainer.append(userTemplate);
        sendButton.attr('disabled', true);

        let botTempalte = `<div class="message bot">
                <div class="message-inner">
                    <div class="profile">
                        <span class="profile-inner">
                           <i class="fa-solid fa-dna fa-2x"></i>
                        </span>
                    </div>
                    <div class="text">
                        <div class="spinner-border loading" role="status">
                          <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>
                    <div style="float: none; clear: both"></div>
                </div>
            </div>`

        messageContainer.append(botTempalte);
        let target = $('.loading').parent();
        window.scrollTo(0, target.offset().top);

        let data = { "question": content };
        $.ajax({
            url: config.chatUrl + "/chat",
            type: "POST",
            data: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            },
            success: function (res) {
                let response = res.answer;
                let result = response.replace(/<[^>]*>?/g, '');
                result = result.replace(content, "");
                result = result.replaceAll("▃", "");
                result = result.replace(`{"answer":"`, "");
                result = result.replaceAll('"}', "");
                result = result.trim();
                console.log(response);
                target.html(`<p>${result}</p>`);
                window.scrollTo(0, target.offset().top);
                sendButton.attr('disabled', false);
            },
            error: function (err) {
                console.log(err)
                let response = "Error!!";
                target.html(`<p>${response}</p>`);
                window.scrollTo(0, target.offset().top);
                sendButton.attr('disabled', false);
            }
        })
    }
})