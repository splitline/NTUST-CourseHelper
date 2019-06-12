function getCourseData(elem) {
    if (elem.classList.contains("simulator-course"))
        return {
            CourseNo: elem.querySelector(".course-no").textContent,
            CourseName: elem.querySelector("strong.clickable").textContent
        };
    else return getCourseData(elem.parentNode);
}

function initLogin(account) {
    setInterval(() => {
        chrome.runtime.sendMessage({
            action: "login",
            account: account
        })
    }, 1000 * 60 * 10);
}


// sync button

document.addEventListener("click", (e) => {
    if (e.target.className === "btn btn-sky btn-xs") {
        chrome.runtime.sendMessage({
            action: "take",
            course: getCourseData(e.target)
        }, ({
            CheckResult,
            Message
        }) => (!CheckResult && Message !== "已新增此課程") && toastr.warning(Message, "待選清單"));
    } else if (e.target.className === "btn btn-danger btn-xs") {
        chrome.runtime.sendMessage({
            action: "drop",
            course: getCourseData(e.target)
        });
    }
})


// Login querycourse 

chrome.storage.sync.get({
    account: null
}, data => {
    if (!data.account) {
        document.querySelectorAll("main>*").forEach(elem => elem.style.display = 'none');
        const loginForm = document.createElement("div");
        loginForm.className="container";
        loginForm.innerHTML = `
        <h3>選課小助手<small>協助同步待選清單與 crosslink </small></h3>
        <p>請使用選課系統帳號登入。</p>
        <input class="form-control" type="text" id="login-id" placeholder="帳號">
        <input class="form-control" type="password" id="login-pw" placeholder="密碼">
        <hr>
        <button class="btn btn-primary btn-large btn-block" id="login"> 登入 </button>
        `;
        document.querySelector("main").appendChild(loginForm);
        document.getElementById("login").onclick = () => {
            let account = {
                Account: document.getElementById("login-id").value,
                Password: document.getElementById("login-pw").value
            };
            if(!account.Account.trim() || !account.Password.trim()) {
                toastr.error("帳號密碼不得為空");
                return;
            }
            chrome.runtime.sendMessage({
                action: "login",
                account: account
            }, res => {
                res.Success ? toastr.success("登入成功！"): toastr.error(res.Message);
                if(res.Success) {
                    chrome.storage.sync.set({ account })
                    initLogin(account);
                    document.querySelectorAll("main>*").forEach(elem => elem.style.removeProperty('display'));
                    loginForm.style.display = 'none';
                };
            })
        }
    } 
    else initLogin(data.account);
});


// export button

const exportBtn = document.createElement("button");
exportBtn.className = "btn btn-gray btn-block";
exportBtn.textContent = "全部匯出至待選清單";
exportBtn.onclick = () => {
    exportBtn.disabled = true;
    const courseList = [...document.querySelectorAll('#simulator-current-courses .simulator-course')].map(elem => getCourseData(elem));
    let counter = 0;
    courseList.forEach(course => chrome.runtime.sendMessage({
        action: "take",
        course: course
    }, json => {
        if (!json.CheckResult && json.Message !== "已新增此課程")
            toastr.warning(json.Message, json.CourseName);
        if (++counter === courseList.length) {
            exportBtn.textContent = "完成！";
            setTimeout(() => {
                exportBtn.textContent = "全部匯出至待選清單";
                exportBtn.disabled = false;
            }, 1000);
        }
    }))
};
document.getElementById("simulator-sidebar").appendChild(exportBtn);