let page = 1;
let per_page = 20;
let total = 0;
let max_pages = 0;
let extra_pages = 0;

const query = localStorage.getItem('query');
const results = document.querySelector('#results');
const nextbtn = document.querySelector('#next');
const prevbtn = document.querySelector('#prev');

const component = document.querySelector('#component');
const container = document.querySelector('.container');
const closebtn =component.querySelector('button');

function loaded()
{
    nextbtn.addEventListener('click',next,false);
    prevbtn.addEventListener('click',prev,false);
    getReq(page,per_page,query);   
    
    closebtn.addEventListener('click',closeModal,false);
}
 
function getReq(page,per_page,query)
{
    const url = `https://api.pexels.com/v1/search?query=${query}&per_page=${per_page}&page=${page}`;

    const options = 
    {            
        'Authorization':  '563492ad6f91700001000001196d79ffb3254d628cf53f89f2cbf335'
    };

    fetch(url, { headers: options}) 
    .then(resp => resp.json())
    .then(data => 
        {
            console.log(data);
            total = data.total_results;
            console.log(total);
            max_pages = Math.round(total/per_page);
            extra_pages = total % per_page;
            
            arrange(data);
        })
    .catch(err => 
    {
        
      console.log(err);
          
    }); 
}

function arrange(data)
{
    results.innerHTML = '';
    data.photos.forEach(pic =>
    {
        const panel = document.createElement('div');
        const image = document.createElement("img");
        const more = document.createElement("button");
        more.innerHTML = "More";

        panel.classList.add("img-panel");
        image.src = pic.src.tiny;
        
        more.addEventListener('click', e => 
        {           
            openModal(pic.src.original, pic.photographer,pic.photographer_url);
        },false);

        panel.appendChild(image);
        panel.appendChild(more);
        results.appendChild(panel);
    })
}

function next()
{
    page=page+1;   
    if( extra_pages > 0)
    {
        max_pages = max_pages+1;
    }

    if(page > max_pages)
    {
        page = max_pages;
    }
    getReq(page,per_page,query);
}


function prev()
{
    page = page-1;
    if(page < 1)
    {
        page  = 1;
    }
    getReq(page,per_page,query);
}

function openModal(img_url,Author,url_author)
{
   
    component.style.display = "block";
    
    const details = document.createElement('div');
    details.classList.add("details"); 
   

    const image = document.createElement("img");
    const author = document.createElement("a")
    const h3 = document.createElement("h3");
    const dwnld = document.createElement("a")

    image.src = img_url;
    author.href = url_author;
    author.target = "_blank";
    author.innerHTML  = Author.toUpperCase();

    dwnld.innerHTML = "Download";
    dwnld.href = img_url;
    dwnld.target = "_blank"; 

    h3.innerHTML = 'Photographer :  ';    
    h3.appendChild(author);

    details.appendChild(h3);
    details.appendChild(dwnld);

    container.appendChild(image);
    container.appendChild(details);



   
}

function closeModal()
{
    component.style.display = "none";
    container.innerHTML = null;
}



//console.log(query);

addEventListener('load',loaded,false);


