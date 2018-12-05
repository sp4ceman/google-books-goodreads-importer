# terrible way of uploading google play books data into goodreads.

## step 1 - download your own google play books library : 
* go to the following URL :  https://myaccount.google.com/privacy?pli=1#takeout
* under Download your data, click CREATE ARCHIVE
* select Google Play Books
* click NEXT and follow the instructions

## step 2 - extract your google play library somewhere

## step 3 - copy index1.js, index2.js and package.js into the same folder as the root index.html in your newly extracted google play data

## run npm update 

## run node index.js (this should output a file called googleIDs.txt)

## run node index2.js (this should outload isbn.txt)

## upload isbn.txt into goodreads csv importer (https://www.goodreads.com/review/import)

## this works on my machine. it may not work on yours. 
