var fs = require('fs');
var gbooks = require('google-books-search');
var GOOGLE_API_KEY = 'your_google_books_api_key'; //not really needed but might get around api limits

var getDirs = function (rootDir, cb) {
    fs.readdir(rootDir, function (err, files) {
        var dirs = [];
        for (var index = 0; index < files.length; ++index) {
            var file = files[index];
            if (file[0] !== '.') {
                var filePath = rootDir + '/' + file;
                fs.stat(filePath, function (err, stat) {
                    if (stat.isDirectory()) {
                        dirs.push(this.file);
                    }
                    if (files.length === (this.index + 1)) {
                        return cb(dirs);
                    }
                }.bind({ index: index, file: file }));
            }
        }
    });
}

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}


var getGoogleIds = function () {
    getDirs('./books', function (data) {

        //for (var i = 0; i < data.length; i++) {
        for (var i = 0; i < data.length; i++) {
            console.log(data[i]);

            fs.readFile('./books' + '/' + data[i] + '/' + data[i] + '.html', 'utf8', function (err, html) {
                if (html) {
                    var openString = escapeRegExp('https://play.google.com/store/books/details?id=');
                    var closeString = escapeRegExp('&amp;source=gbs_api');
                    var start = html.search(openString);
                    var end = html.search(closeString);
                    var distance = end - (start + 47);
                    var googleID = html.substr(start + 47, distance);
                    fs.appendFileSync('googleIDs.txt', googleID + '\n');
                }
            });
        };
    })
};



//run get googleId's the first time to parse your books and make a list of all of the google id's in your library
getGoogleIds();

