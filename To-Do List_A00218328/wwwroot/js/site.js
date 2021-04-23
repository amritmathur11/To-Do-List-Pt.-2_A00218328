function CopyTitle(text) {
    if ('clipboard' in navigator) {
        let canWriteClipboard = false;
        navigator.permissions.query({ name: 'clipboard-read' }).then((perms) => {
            canWriteClipboard = perms.state;

            if (canWriteClipboard === "granted") {
                    CopyTextToClipBoard(text);
            } else if (canWriteClipboard === "prompt") {
                    ShowErrMessage('Link cannot be copied according to given permissions..')
            }
            else {
                return;
            }
            $("#copyToClipboard").removeAttr('hidden');
        });



    }
}
function CopyTextToClipBoard(text) {
    
    var copyText = document.createElement("input");
    document.body.appendChild(copyText);
    copyText.setAttribute("id", "copy_Text");
    document.getElementById("copy_Text").value = text;
    if (text.trim() == "") {
        //showToaster({ msg: "Link can't be empty", priority: "error" });
        ShowErrMessage('Link cannot be empty');
    }
    else {
        copyText.select();
        document.execCommand("copy");
        ShowMessage('Link copied to the clipboard');
        //showToaster({ msg: "Link copied to the clipboard", priority: "success" });
    }
    document.body.removeChild(copyText);
}
function ShowMessage(message) {
    swal("Success!", message, "success");
    //$('#show-message').text(message)
    //$('#show-message').fadeIn(3000);

  }
function ShowErrMessage(message) {

    swal("Error!", message, "error");
    //$('#show-errmessage').text(message)
    //$('#show-errmessage').fadeIn(3000);

    //setTimeout(function () {
    //    $('#show-errmessage').fadeOut(3000);
    //}, 3000);
}

// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
(function () {
    // ServiceWorker is a progressive technology. Ignore unsupported browsers
    if ('serviceWorker' in navigator) {
        console.log('CLIENT: service worker registration in progress.');
        navigator.serviceWorker.register('/sw.js').then(function () {
            console.log('CLIENT: service worker registration complete.');
        }, function () {
            console.log('CLIENT: service worker registration failure.');
        });
    } else {
        console.log('CLIENT: service worker is not supported.');
    }

})();

window.onclick = function (event) {
    
    if (!navigator.onLine) {
        if (event.target.className.indexOf('remove-at-offline') != -1) {
            event.preventDefault();
        }
        swal("Offline!", "You cannot do this operation because you are offline!", "error");
       
    }
    else {
        //$('.remove-at-offline').removeClass('hidden')
    }
}
