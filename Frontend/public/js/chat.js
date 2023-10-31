const messageContainer = $(".message-container");
const messageSend = $("#content");
const sendButton = $("#send");

let count = 0;

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

        let response = "어쩌라구요..";

        setTimeout(() => {
            count += 1;
            target.html(`<p>${response} ${count}</p>`);
            window.scrollTo(0, target.offset().top);
            sendButton.attr('disabled', false);
        }, 2000);


        // $.ajax({
        //     url: 123213123,
        //     type: "GET"
        // }).then((res) => {
        //     response = res.result;
        // }).catch((err) => {
        //     response = "Error!!";
        // })


    }
})