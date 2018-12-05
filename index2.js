var fs = require('fs');
var gbooks = require('google-books-search');
var GOOGLE_API_KEY = 'your_google_books_api_key'; //not really needed but might get around api limits

var lookupBooks = function () {
    var idArr = fs.readFileSync('googleIDs.txt').toString().split("\n");
    gbookSearch(idArr);
}

var gbookSearch = function (data) {
    var options = {
        field: 'title',
        offset: 0,
        limit: 1,
        type: 'books',
        order: 'relevance',
        lang: 'en'
    }

    if (GOOGLE_API_KEY != 'your_google_books_api_key') {
        options.key = GOOGLE_API_KEY;
    }

    fs.appendFileSync('isbn.txt', 'ISBN' + '\n');

    for (var i = 0; i < data.length; i++) {
        gbooks.lookup(data[i], options, function (error, results) {
            if (!error) {
                try {
                    var isbn = results.industryIdentifiers[0].identifier;
                    var title = results.title;
                    fs.appendFileSync('isbn.txt', isbn + '\n');
                    console.log('---------------');
                }
                catch (err) {
                    console.log(err);
                    console.log(results);
                }

            } else {
                console.log(error);
            }
        });
    }
}

lookupBooks();