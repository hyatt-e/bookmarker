// Listen for form submit
document.getElementById("myForm").addEventListener("submit", saveBookmark);

function saveBookmark(e){
    // get form values
    var siteName = document.getElementById("siteName").value;
    var siteUrl = document.getElementById("siteUrl").value;

    if(!validateForm(siteName, siteUrl)){
        return false;
    }

    var bookmark = {
        name: siteName,
        url: siteUrl
    }

    /*
    // local storage
    // to store:
    localStorage.setItem('test', "hello world");

    // to get item from storage:
    console.log(localStorage.getItem('test'))

    // to remove from storage:
    localStorage.removeItem("test")
    */
   
    if(localStorage.getItem('bookmarks') === null){
    
        // init array
        var bookmarks = [];
        // add to array
        bookmarks.push(bookmark);
        // set local storage - JSON.stringify to convert to string for storage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks))

    } else {
        // get bookmarks from storage - JSON.parse to convert from string
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

        // add bookmark to array
        bookmarks.push(bookmark);

        // set to local storage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    // clear form
    document.getElementById('myForm').reset();

    // refetch bookmarks
    fetchBookmarks();

    // prevent form from submitting
    e.preventDefault();
}

// Delete Bookmark
function deleteBookmark(url){
    // get bookmarks from local storage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // loop throuhg bookmarks
    for(var i =0;i < bookmarks.length;i++){
        // check whether url matches with delete request
        if(bookmarks[i].url == url){
            // remove from array
            bookmarks.splice(i, 1);
        }
    }
    // reset back to local storage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    // refetch bookmarks
    fetchBookmarks();
}

// fetch stored bookmarks
function fetchBookmarks(){
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    // get output id
    var bookmarksResults = document.getElementById('bookmarksResults');

    // build output
    bookmarksResults.innerHTML = "";

    for(var i = 0; i < bookmarks.length; i++){
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;
        
        bookmarksResults.innerHTML += '<div class="card-columns">'+
                                      '<div class="card">'+
                                      '<div class="card-body">'+
                                      '  <h3>'+name+
                                      '    <a class="btn btn-info" target="_blank" href="'+addhttp(url)+'">Visit</a> ' +
                                      '    <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a> ' +
                                      '  </h3>'+
                                      '</div>' +
                                      '</div>' +
                                      '</div>';
    }
}

function validateForm(siteName, siteUrl){
    if(!siteName || !siteUrl){
    alert("Please fill both fields.");
    return false;

    }

    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if(!siteUrl.match(regex)){
        alert("Please use a valid URL.");
        return false;
    }

    return true;
}

function addhttp(url) {
  if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
      url = "http://" + url;
  }
  return url;
}
