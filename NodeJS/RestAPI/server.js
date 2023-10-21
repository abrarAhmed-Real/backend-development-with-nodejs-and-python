var http = require('http');
var file=require('fs');
//const express=require('express');
//const hash=require('sha256')


// these functions are working perfectly fine



// reading the file

const express=require('express');

file.readFile('index.html',function(data,err)
{
if (!err){
console.log('done!!!');
}
else{
console.log(err);
}
});


// appending text to the file


file.appendFile('index.html' , 'end' , function(err){

console.log(err);
});


// opening a file

file.open('data.txt','w' , function(err){
if(err){
console.log(err);

}
else{
console.log('file opened for writing ..........');


}

});


// writing to a file

file.writeFile('data.txt','the content of the file' , function(err){
if(err)console.log(err)
console.log('content wirtten successfullly');

});


// deleting a file....
file.unlink('index.html', function(err){
if(err)console.log(err)
else console.log('file deleted sucessfully......');
});


// renaming a file

file.rename('data.txt','info.txt' , function(err){
if(err){
console.log(err)
}
else{
console.log('file renamed successfully')
}
});




http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write(req.url);
  res.write('<br>');
  res.write('<h1>');
  res.write('The current date is' + Date());
  res.write('</h1>');
  res.write('<br>');

  res.end('Hello World! mofs');
  
}).listen(8081);