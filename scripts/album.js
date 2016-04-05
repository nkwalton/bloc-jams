 // Example Album
 var albumPicasso = {
     title: 'The Colors',
     artist: 'Pablo Picasso',
     label: 'Cubism',
     year: '1881',
     albumArtUrl: 'assets/images/01.png',
     songs: [
         { title: 'Blue', duration: '4:26' },
         { title: 'Green', duration: '3:14' },
         { title: 'Red', duration: '5:01' },
         { title: 'Pink', duration: '3:21'},
         { title: 'Magenta', duration: '2:15'}
     ]
 };
 
 // Another Example Album
 var albumMarconi = {
     title: 'The Telephone',
     artist: 'Guglielmo Marconi',
     label: 'EM',
     year: '1909',
     albumArtUrl: 'assets/images/20.png',
     songs: [
         { title: 'Hello, Operator?', duration: '1:01' },
         { title: 'Ring, ring, ring', duration: '5:01' },
         { title: 'Fits in your pocket', duration: '3:21'},
         { title: 'Can you hear me now?', duration: '3:14' },
         { title: 'Wrong phone number', duration: '2:15'}
     ]
 };

//My Album
var albumTheOffspring = {
    title: 'Americana',
    artist: 'The Offspring',
    label: 'Comumbia Records',
    year: '1998',
    albumArtURL: 'assets/images/americana.jpg',
    songs: [
        { title: 'Welcome', duration: '0:10' },
        { title: 'Have You Ever', duration: '3:57' },
        { title: 'Staring at the Sun', duration: '2:13' },
        { title: 'Pretty Fly (For a White Guy)', duration: '3:04' },
        { title: 'The kids Arent\'t Alright', duration: '3:00' },
    ]
};

 var createSongRow = function(songNumber, songName, songLength) {
     var template =
        '<tr class="album-view-song-item">'
      + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
      + '  <td class="song-item-title">' + songName + '</td>'
      + '  <td class="song-item-duration">' + songLength + '</td>'
      + '</tr>'
      ;
 
     return template;
 };

//select elements that we want to populate with text dynamically.
var albumTitle = document.getElementsByClassName('album-view-title')[0];
var albumArtist = document.getElementsByClassName('album-view-artist')[0];
var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
var albumImage = document.getElementsByClassName('album-cover-art')[0];
var albumSongList = document.getElementsByClassName('album-view-song-list')[0];

var setCurrentAlbum = function(album) {
     // #1
     var albumTitle = document.getElementsByClassName('album-view-title')[0];
     var albumArtist = document.getElementsByClassName('album-view-artist')[0];
     var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
     var albumImage = document.getElementsByClassName('album-cover-art')[0];
     var albumSongList = document.getElementsByClassName('album-view-song-list')[0];
 
     // #2
     albumTitle.firstChild.nodeValue = album.title;
     albumArtist.firstChild.nodeValue = album.artist;
     albumReleaseInfo.firstChild.nodeValue = album.year + ' ' + album.label;
     albumImage.setAttribute('src', album.albumArtUrl);
 
     // #3
     albumSongList.innerHTML = '';
 
     // #4
     for (var i = 0; i < album.songs.length; i++) {
         albumSongList.innerHTML += createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
     }
 };

var findParentByClassName = function(element, targetClass) {
        var currentParent = element.parentElement;
        
        if (currentParent) {
            while (currentParent.className && currentParent.className != targetClass) {
                currentParent = currentParent.parentElement;
        } 
            if (currentParent.className == targetClass) {
                return currentParent;
            } else {
                alert("No parent with that class name found.");
            }   
        } else {
            alert("No parent found."); 
        }
};

var findParentByClassName = function(element, targetClass) {
    if (element) {
        var currentParent = element.parentElement;
        //check if parent exists, if not, alert "No parent found"
        //check parent witha the given class name, if it fails- alert "No parent found with that class name"
        return currentParent;
    }
};

//x = document.getElementsByCLassName('potato')[0]
// findParentByClassName(x, "album-row")

// getSongItem function to always return the song item.
var getSongItem = function(element) {
    switch(element.className) {
        case 'album-song-button': 
        case 'ion-play': 
        case 'ion-pause':
            return findParentByClassName(element, 'song-item-number');
        case 'album-view-song-item':
            return element.querySelector('.song-item-number');
        case 'song-item-title':
        case 'song-item-duration':
            return findParentByClassName(element, 'album-view-song-item').querySelector('.song-item-number');
        case 'song-item-number':
            return element;       
        default:
            return;
}
};

var clickHandler = function(targetElement) {
    
    var songItem = getSongItem(targetElement);
    
    if(currentlyPlayingSong === null) {
        songItem.innerHTML = pauseButtonTemplate;
        currentlyPlayingSong = songItem.getAttribute('data-song-number');
    
    } else if (currentlyPlayingSong === songItem.getAttribute('data-song-number')) {
         songItem.innerHTML = playButtonTemplate;
         currentlyPlayingSong = null;
    
    } else if (currentlyPlayingSong !== songItem.getAttribute('data-song-number')) {
         var currentlyPlayingSongElement = document.querySelector('[data-song-number="' + currentlyPlayingSong + '"]');
         currentlyPlayingSongElement.innerHTML = currentlyPlayingSongElement.getAttribute('data-song-number');
         songItem.innerHTML = pauseButtonTemplate;
         currentlyPlayingSong = songItem.getAttribute('data-song-number');
    }

};

    //the table element, class .album-view-song-list. 
    //store the selected table in a variable.
 var songListContainer = document.getElementsByClassName('album-view-song-list')[0];
 var songRows = document.getElementsByClassName('album-view-song-item');


    //Album button templates
 var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
 var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';

// Store state of playing songs
 var currentlyPlayingSong = null;


 window.onload = function() {
     setCurrentAlbum(albumPicasso);
     
     //add a 'mouseover' listener event to the songListContainer variable.
     songListContainer.addEventListener('mouseover', function(event) {
         // the target property called on the event object below stores the DOM
         // element where the event occured.
         // Only target individual song rows during event delegation
         if (event.target.parentElement.className === 'album-view-song-item') {
             event.target.parentElement.querySelector('.song-item-number').innerHTML = playButtonTemplate;
             var songItem = getSongItem(event.target);    
                //conditional statement only change innerHTML of the table cell
                //when the element does not belong to the current playing song.
             if (songItem.getAttribute('data-song-number') !== currentlyPlayingSong) {
                 songItem.innerHTML = playButtonTemplate;
             }
         }       
     });
     
        
        for (var i = 0; i < songRows.length; i++) {
          songRows[i].addEventListener('mouseleave', function(event) {
              // #1
             var songItem = getSongItem(event.target);
             var songItemNumber = songItem.getAttribute('data-song-number');
 
             // #2
             if (songItemNumber !== currentlyPlayingSong) {
                 songItem.innerHTML = songItemNumber;
             }
          });
          
          songRows[i].addEventListener('click', function(event) {
              clickHandler(event.target);
          });    
        }

     //event listener to toggle through three albums
     var albums = [albumPicasso, albumMarconi, albumTheOffspring];
     var index = 0;
     albumImage.addEventListener("click", function(event) {
                setCurrentAlbum(albums[index]);
                index++;
     });
 };