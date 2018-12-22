// ImageData.prototype.getRGB = function (x, y) {
//     if (x < 0 || x > this.width || y < 0 || y > this.height) {
//         return 0xFFFFFF;
//     } else {
//         let i = (y * this.width + x) << 2;
//         return this.data[i] << 16 | this.data[i + 1] << 8 | this.data[i + 2];
//     }
// }

// ImageData.prototype.setRGB = function (x, y, color) {
//     let i = (y * this.width + x) << 2;
//     let red = (color & 0xFF0000) >> 16, green = (color & 0x00FF00) >> 8, blue = (color & 0x0000FF);
//     this.data[i] = red;
//     this.data[i+1] = green;
//     this.data[i+2] = blue;
// }

// function countNonWhite(imgData, x, y) {
//     let count = 0;
    
//     if ( ( imgData.getRGB(x+1, y+0) & 0xFFFFFF ) == 0xFFFFFF ) count+=2;
//     if ( ( imgData.getRGB(x+0, y+1) & 0xFFFFFF ) == 0xFFFFFF ) count+=2;
//     if ( ( imgData.getRGB(x-1, y+0) & 0xFFFFFF ) == 0xFFFFFF ) count+=2;
//     if ( ( imgData.getRGB(x+0, y-1) & 0xFFFFFF ) == 0xFFFFFF ) count+=2;
    
//     if ( ( imgData.getRGB(x+1, y+1) & 0xFFFFFF ) == 0xFFFFFF ) count++;
//     if ( ( imgData.getRGB(x-1, y+1) & 0xFFFFFF ) == 0xFFFFFF ) count++;
//     if ( ( imgData.getRGB(x+1, y-1) & 0xFFFFFF ) == 0xFFFFFF ) count++;
//     if ( ( imgData.getRGB(x-1, y-1) & 0xFFFFFF ) == 0xFFFFFF ) count++;
    
//     return count;
// }

// function bfs(imgData, x, y) {
//     let queue = [];
//     let res = [];
//     queue.push([x, y]);
//     // queue.push(2);         // queue is now [2]
//     // queue.push(5);         // queue is now [2, 5]
//     // var i = queue.shift(); // queue is now [5]
//     let minX, maxX, minY, maxY;
//     minX = minY = 0x7FFFFFFF;
//     maxX = maxY = -1;
//     while ( true ) {
//         if ( queue.length == 0 ) {
//             // We're done
//             break;
//         }
//         console.log(queue)
//         p = queue.shift();
        
//         x = p[0];
//         y = p[1];
        
//         imgData.setRGB( x, y, 0xFFFFFF );
        
//         if ( x-1 >= 0 ) {
//             if ( ( imgData.getRGB( x-1, y ) & 0x000000 ) == 0 ) {
//                 // Black tile, we can add it
//                 queue.push( [x-1, y] );
//                 imgData.setRGB( x-1, y, 0xFFFFFF );
//             }
//         }
        
//         if ( x+1 < imgData.width ) {
//             if ( ( imgData.getRGB( x+1, y )&0x000000 ) == 0 ) {
//                 // Black tile, we can add it
//                 queue.push( [x+1, y] );
//                 imgData.setRGB( x+1, y, 0xFFFFFF );
//             }
//         }
        
//         if ( y-1 >= 0 ) {
//             if ( ( imgData.getRGB( x, y-1 )&0x000000 ) == 0 ) {
//                 // Black tile, we can add it
//                 queue.push( [x, y-1] );
//                 imgData.setRGB( x, y-1, 0xFFFFFF );
//             }
//         }
        
//         if ( y+1 < imgData.height ) {
//             if ( ( imgData.getRGB( x, y+1 )&0x000000 ) == 0 ) {
//                 // Black tile, we can add it
//                 queue.push( [x, y+1] );
//                 imgData.setRGB( x, y+1, 0xFFFFFF );
//             }
//         }
        
//         if ( x < minX ) minX = x;
//         if ( x > maxX ) maxX = x;
//         if ( y < minY ) minY = y;
//         if ( y > maxY ) maxY = y;
        
//         res.push( [ x, y ] );
//     }

//     if ( res.size() < 5 ) {
//         // Heck it
//         console.log( "Detected block with size %d\n", res.length)
//     } else {
//         console.log([res, minX, maxX, minY, maxY]);
//         return imgData;
//     }
    
// }

// preprocess = document.createElement("canvas")
// preprocess.width = Image2.width; preprocess.height = Image2.height; 
// document.querySelector("#Table1 > tbody > tr:nth-child(5) > td:nth-child(2)").appendChild(preprocess)
// ctx = preprocess.getContext("2d")
// ctx.drawImage(Image2,0,0)

// imgData = ctx.getImageData(0,0,Image2.width,Image2.height);

// for (var i=0;i<imgData.data.length;i+=4) {
//     var x = (i / 4) % imgData.width, y = Math.floor((i / 4) / imgData.width);
//     if(countNonWhite(imgData, x, y) >= 10 )
//         imgData.data[i] = imgData.data[i+1] = imgData.data[i+2] = 0xFF;
//     else if(imgData.data[i] == imgData.data[i+1] 
//         && imgData.data[i+1] == imgData.data[i+2] && imgData.data[i] != 0xFF)
//         imgData.data[i] = imgData.data[i+1] = imgData.data[i+2] = 0;
// }

// ctx.putImageData(imgData,0,0)


// for (let j = 0; j < imgData.width; j++ ) {
//     for (let i = 0; i < imgData.height; i++ ) {
//         if ( ( imgData.getRGB( j, i ) & 0x000000 ) === 0 ) {
//             // Black tile, init BFS
//             imgData = bfs(imgData, j, i );
//         }
//     }
// }


var thead = document.createElement('thead');
thead.innerHTML = '<tr><th style="width:42px;">餘額</th><th style="font-size:X-Small;width:60px;">課程代碼</th><th style="width:50px;">通識向度</th><th style="font-size:X-Small;width:230px;">課程名稱</th><th>課程大綱</th><th style="font-size:X-Small;width:50px;">學分</th><th style="width:50px;">選必</th><th style="width:50px;">全半</th><th style="font-size:X-Small;width:100px;">授課教師</th><th style="font-size:X-Small;width:150px;">上課星期節次</th><th style="font-size:X-Small;width:50px;">教室</th><th style="font-size:X-Small;width:32px;">詳細資料</th><th style="font-size:X-Small;width:32px;">本校選課人數</th><th style="width:32px;">連盟兩校選課人數</th><th style="width:32px;">選課總人數</th><th style="font-size:X-Small;">備註</th></tr>';
var table = document.getElementById('my_dg');
table.firstElementChild.firstChild.outerHTML = "";
table.insertBefore(thead, table.firstChild);
table.style = "background-color:White;border-color:Green;font-size:X-Small;width:100%;"

var tbody = table.getElementsByTagName("tbody");
for (var i = 0; i < tbody[0].children.length; i++) {
    var item = tbody[0].children[i];    // <tr>

    var a = document.createElement('a');
    a.innerText = "搜尋此課程評價"
    a.href = "https://www.google.com.tw/search?q=" + item.children[2].innerText + "+" + item.children[7].innerText;
    a.target = "_blank";
    a.className = "button button-primary-flat";
    item.lastElementChild.appendChild(a);

    var remain_td = document.createElement('td');
    if (item.children[14].innerText.match(/限(\d+)人/) !== null) {
        var people = parseInt(item.children[13].innerText);
        var limit = parseInt(item.children[14].innerText.match(/限(\d+)人/)[1]);
        if (people < limit) {
            remain_td.innerHTML = "<h2>✔</h2>";
        } else {
            remain_td.innerHTML = "<h2>✘</h2>";
        }
    } else {
        remain_td.innerHTML = "<h2>❓</h2>";
    }
    item.insertBefore(remain_td, item.firstChild);
}

var tfConfig = {
    base_path: 'https://unpkg.com/tablefilter@0.6.10/dist/tablefilter/',
    alternate_rows: true,
    col_0: 'select',
    col_2: 'select',
    col_4: 'none',
    col_5: 'select',
    col_6: 'select',
    col_7: 'select',
    col_11: 'none',
    rows_counter: {
        text: '課程數：'
    },
    btn_reset: {
        text: '清除搜尋'
    },
    loader: true,
    no_results_message: true,
    col_types: [
        'string',   //full?
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