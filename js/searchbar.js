document.addEventListener('DOMContentLoaded', () => {
    const typingBar = document.getElementById('typingBar');
    let typingTimeout;

    window.addEventListener('pageshow', () => {
        typingBar.textContent = '';
        typingBar.style.display = 'none'
    }); //Make sure search bar is clear when going back to page

    document.addEventListener('keydown', (event) => {
        if (typingBar.style.display === 'none') {
            typingBar.style.display = 'block';
        }

        if (event.key === 'Backspace') {
            typingBar.textContent = typingBar.textContent.slice(0, -1);
        } else if (event.key === 'Enter') {
            searchHandler(typingBar.textContent);
        } else if (event.key.length === 1) {
            typingBar.textContent += event.key;
        } 

        clearTimeout(typingTimeout);
        typingTimeout = setTimeout(() => {
            typingBar.style.display = 'none';
        }, 2000);
    });
});
function searchHandler(searchIn){
    if(searchIn[0] == ':'){
        var site, search;
        [site, search] = searchIn.split(/(?<=^\S+)\s/);
        switch(site){
            case ':gh':
                window.location.href = 'https://github.com/search?type=repositories&q=' + search;
                break;
            case ':yt':
                window.location.href = 'https://www.youtube.com/results?search_query=' + search;
                break;
            case ':im':
                window.location.href = 'https://www.google.com/search?tbm=isch&q=' + search;
                break;         
        } /* could realistically use a dictionary, e.g. {"yt": "yt link", "gh": "gh link"} 
        and just do href = dict[site]... Might do in future to allow easier config */
    } else {
        window.location.href = 'https://www.google.com/search?q=' + searchIn;
    }
}