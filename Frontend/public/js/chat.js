const messageContainer = $(".message-container");
const messageSend = $("#content");
const sendButton = $("#send");

messageSend.on('keydown', (e) => {
    if (e.keyCode == 13 && !(sendButton.prop("disabled"))) {
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

        let data = { question: content };
        $.ajax({
            url: "http://43.202.9.254:8000/chat",
            type: "GET",
            data: data,
            dataType: 'json',
            success: function (res) {
                let response = res.answer;
                console.log(response);
                target.html(`<p>${response}</p>`);
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