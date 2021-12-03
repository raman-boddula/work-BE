function req(arr, curr, res) {
    if (res.length>0) {
        console.log(res)
    }
    if(curr==arr.length ){
        // console.log(res)
        return;
    }
    for(var j=curr;j<arr.length;j++){
        req(arr,j+1,res);
        req(arr,j+1,res+arr[j])
    }
 }

function runProgram(input) {
    // Write code here
    input = input.trim();
    // console.log(input.length)
    req(input,0,"")
    }
if (process.env.USER == "myubuntu") {
    runProgram(`123`)
} else {
    process.stdin.resume();
    process.stdin.setEncoding("ascii");
    let read = "";
    process.stdin.on("data", function (input) {
        read += input;
    });
    process.stdin.on("end", function () {
        read = read.replace(/\n$/, "");
        read = read.replace(/\n$/, "");
        runProgram(read);
    });
    process.on("SIGINT", function () {
        read = read.replace(/\n$/, "");
        runProgram(read);
    });
}