
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





// const http = require("http");
// const fs = require("fs");
// const html = fs.readFileSync("./files/index.html", "utf-8");
// const jsondata = JSON.parse(fs.readFileSync("./Data/jsondata.js", "utf-8"));
// const producthtml = fs.readFileSync("./files/productlist.html", "utf-8");

// const replacePlaceholders = (template, data) => {
//     let output = template.replace(/{{%XIMAGEX%}}/g, data.productImage);
//     output = output.replace(/{{%XNAMEX%}}/g, data.name);
//     output = output.replace(/{{%XMODELNAMEX%}}/g, data.modelName);
//     output = output.replace(/{{%MODELNO%}}/g, data.modelNumber);
//     output = output.replace(/{{%SIZE%}}/g, data.size);
//     output = output.replace(/{{%XCAMERAX%}}/g, data.camera);
//     output = output.replace(/{{%XPRICE%}}/g, data.price);
//     output = output.replace(/{{%XCOLOR%}}/g, data.color);
//     return output;
// };

// const replacehtml = jsondata.map(item => replacePlaceholders(producthtml, item)).join('');

// const app = http.createServer((req, res) => {
//     const path = req.url.toLowerCase();
//     if (path === "/" || path === "/home") {
//         res.writeHead(200, {
//             "Content-type": "text/html",
//             "my-header": "this is my own website"
//         });
//         res.end(html.replace("{{%CONTENT%}}", "you are in Home page"));
//     } else if (path === "/contact") {
//         res.writeHead(200);
//         res.end(html.replace("{{%CONTENT%}}", "you are in Contact page"));
//     } else if (path === "/about") {
//         res.writeHead(200);
//         res.end(html.replace("{{%CONTENT%}}", "you are in About page"));
//     } else if (path === "/products") {
//         const indexreplace = html.replace("{{%CONTENT%}}", replacehtml);
//         res.writeHead(200, { "Content-type": "text/html" });
//         res.end(indexreplace);
//     } else {
//         res.writeHead(404);
//         res.end(html.replace("{{%CONTENT%}}", "404: page not found"));
//     }
// });

// app.listen(8000, '127.0.0.1', () => {
//     console.log("server start");
// });



const http = require("http")
const fs = require("fs")
const url = require("url")

const indexhtml = fs.readFileSync("./files/index.html", "utf-8")
const jsondata = JSON.parse(fs.readFileSync("./Data/jsondata.js", "utf-8"))
const productlist = fs.readFileSync("./files/productlist.html", "utf-8")

let replacefunctionality = (input, item) => {
    let output = input;
    output = output.replace("{{%XIMAGEX%}}", item.productImage)
    output = output.replace("{{%NAME%}}", item.name)
    output = output.replace("{{%XMODELNAMEX%}}", item.modelName)
    output = output.replace("{{%MODELNO%}}", item.modelNumber)
    output = output.replace("{{%SIZE%}}", item.size)
    output = output.replace("{{%XCAMERAX%}}", item.camera)
    output = output.replace("{{%XPRICE%}}", item.price)
    output = output.replace("{{%XCOLOR%}}", item.color)
    output = output.replace("{{%ID%}}", item.id)
    return output
}


const replacedata = jsondata.map((item) => replacefunctionality(productlist, item)).join(",")
// const joineddata = replacehtml.join(",")

const app = http.createServer((req, res) => {
    const { query, pathname: route } = url.parse(req.url, true)
    // console.log(route);
    // const route = req.url
    if (route == "/" || route.toLowerCase() == "/home") {
        res.writeHead(200, {
            "Content-type": "text/html",
            "this-is-my-header": "hijas"
        })
        res.end(indexhtml.replace("{{%CONTENT%}}", "you are in home page "))
    } else if (route.toLowerCase() == "/contact") {
        res.end(indexhtml.replace("{{%CONTENT%}}", "you are in contact page "))
    } else if (route.toLowerCase() == "/about") {
        res.end(indexhtml.replace("{{%CONTENT%}}", "you are in about page "))
    } else if (route.toLowerCase() == "/products") {
        if (!query.id) {
            res.writeHead(200, { "Content-type": "text/html" })
            res.end(indexhtml.replace("{{%CONTENT%}}", replacedata))
        } else {
            res.end("single product deatails Id = "+ query.id)
        }

    } else {
        res.writeHead(404)
        res.end(indexhtml.replace("{{%CONTENT%}}", "404:page not foud"))
    }
})
app.listen(7000, "127.0.0.1", () => {
    console.log("server runnign");
})


