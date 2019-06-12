chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    const API_URL = "https://querycourse.ntust.edu.tw/QueryCourse/api/";
    const JSON_HEADER = {
        'Content-Type': 'application/json; charset=UTF-8'
    }
    switch (request.action) {
        case "login":
            fetch(API_URL + "login", {
                headers: JSON_HEADER,
                credentials: 'include',
                mode: 'cors',
                method: "POST",
                body: JSON.stringify(request.account)
            }).then(r => r.json()).then(json => sendResponse(json));
            break;
        case "take":
            fetch(API_URL + 'course', {
                    headers: JSON_HEADER,
                    credentials: 'include',
                    mode: 'cors',
                    method: 'POST',
                    body: JSON.stringify(request.course)
                })
                .then(r => r.json())
                .then(json => sendResponse({...json, ...request.course}));
            break;
        case "drop":
            fetch(API_URL + 'course', {
                headers: JSON_HEADER,
                credentials: 'include',
                method: "DELETE",
                mode: 'cors',
                body: JSON.stringify(request.course)
            })
            break;
        default:
            break;
    }
    return true;
});