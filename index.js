
// const readline = require("readline");


// const rl = readline.createInterface({
//     input:process.stdin,
//     output:process.stdout
// })
// rl.question("enter your name:",(data)=>{
//   console.log("your name is:",data);
//   rl.close()
// })
// rl.on("close",()=>{
//     console.log("programe clsed");
//     process.exit(0)
// })

// const fs = require("fs");
// const data = fs.readFileSync("./files/input.txt","utf-8")
// fs.writeFileSync("./files/output.txt","this is writing method testing")
// console.log(data);

// fs.readFile(`./files/input.txt`, "utf-8", (erroer1, data1) => {
//     console.log(data1);
//     fs.readFile(`./files/${data1}.txt`, "utf-8", (erroer2, data2) => {
//         console.log(data2);
//         fs.writeFile(`./files/latestfile.txt`,`${data1}_date:${Date.now()}_${data2}`,(erroer3,data3)=>{
//            console.log(data3);
//         })
//     })
// })

const http = require("http")
const fs = require("fs");
const { parse } = require("path");
const html = fs.readFileSync("./files/index.html", "utf-8")
const jsondata = JSON.parse(fs.readFileSync("./Data/jsondata.js", "utf-8"))
const producthtml = fs.readFileSync("./files/productlist.html", "utf-8")
const replacehtml = jsondata.map((items) => {
    let output = producthtml.replace("{{%XIMAGEX%}}", items.productImage)
    output = producthtml.replace("{{%XNAMEX%}}", items.name)
    output = producthtml.replace("{{%XMODELNAMEX%}}", items.modelName)
    output = producthtml.replace("{{%MODELNO%}}", items.modelNumber)
    output = producthtml.replace("{{%SIZE%}}", items.size)
    output = producthtml.replace("{{%XCAMERAX%}}", items.camera)
    output = producthtml.replace("{{%XPRICE%}}", items.price)
    output = producthtml.replace("{{%XCOLOR%}}", items.color)
    return output;
})
const app = http.createServer((req, res) => {
    const path = req.url
    if (path == "/" || path.toLowerCase() == "/home") {
        res.writeHead(200, {
            "Content-type": "text/html",
            "my-header": "this is my on website"
        })
        res.end(html.replace("{{%CONTENT%}}", "you are in Home page "))
    } else if (path.toLowerCase() == "/contact") {
        res.writeHead(200)
        res.end(html.replace("{{%CONTENT%}}", "you are in Contact page"))
    } else if (path.toLowerCase() == "/about") {
        res.writeHead(200)
        res.end(html.replace("{{%CONTENT%}}", "you are in About page"))
    } else if (path.toLowerCase() == "/products") {
        const indexreplace = html.replace("{{%CONTENT%}}", replacehtml.join(","))
        res.writeHead(200, { "Content-type": "text/html" })
        res.end(indexreplace)
    } else {
        res.writeHead(404)
        res.end(html.replace("{{%CONTENT%}}", "404:page note found"))
    }
})
app.listen(8000, '127.0.0.1', () => {
    console.log("server start");
})
