console.log("init");
var thead = document.createElement('thead');
thead.innerHTML = '<tr><th style="font-size:X-Small;width:60px;">課程代碼</th><th style="width:50px;">通識向度</th><th style="font-size:X-Small;width:230px;">課程名稱</th><th>課程大綱</th><th style="font-size:X-Small;width:50px;">學分</th><th style="width:50px;">選必</th><th style="width:50px;">全半</th><th style="font-size:X-Small;width:100px;">授課教師</th><th style="font-size:X-Small;width:150px;">上課星期節次</th><th style="font-size:X-Small;width:50px;">教室</th><th style="font-size:X-Small;width:32px;">詳細資料</th><th style="font-size:X-Small;width:32px;">本校選課人數</th><th style="width:32px;">連盟兩校選課人數</th><th style="width:32px;">選課總人數</th><th style="font-size:X-Small;">備註</th></tr>';
var table = document.getElementById('my_dg');
table.firstElementChild.firstChild.outerHTML = "";
table.insertBefore(thead, table.firstChild);
table.style = "background-color:White;border-color:Green;font-size:X-Small;width:100%;"

var tbody = table.getElementsByTagName("tbody");
for(var i=0; i< tbody[0].children.length;i++){
    var item = tbody[0].children[i];
	var a = document.createElement('a');
	a.innerText="搜尋此課程評價"
    a.href = "https://www.google.com.tw/search?q=" + item.children[2].innerHTML +"+" + item.children[7].innerText;
    a.target = "_blank";
    a.className = "button button-primary-flat"
    item.lastElementChild.appendChild(a);
}

var tfConfig = {
    base_path: 'https://unpkg.com/tablefilter@0.6.10/dist/tablefilter/',
    alternate_rows: true,
    col_1: 'select',
    col_3: 'none',
    col_4: 'select',
    col_5: 'select',
    col_6: 'select',
    col_10: 'none',
    rows_counter: {
        text: '課程數：'
    },
    btn_reset: {
        text: '清除搜尋'
    },
    loader: true,
    no_results_message: true,
    col_types: [
        'string',   //no
        'string',   //A~G
        'string',   //name
        'string',   //outline
        'number',   //credit
        'string',
        'string',
        'string',
        'string',
        'string',
        'string',
        'number',
        'number',
        'number',
        'string'
    ],
};
var tf = new TableFilter(table, tfConfig);
tf.init();
new Tablesort(table);