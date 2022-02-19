let index = -1;

function start(){
    // Gather input from user and split input into department and code
    let codeName = document.getElementById('input').value;
    const course = codeName.split(' ');
    let dept = course[0]+".json";
    let code = course[1]; 

    // Create url based on the department
    let url = 'https://raw.githubusercontent.com/SSADC-at-york/Yoki/main/docs/data/courses/'+dept;

    let table = document.getElementById('table');

    async function getThing(){
        const res = await fetch(url);
        const data = await res.json();
        
        // Outputs information about the course onto page based on 'code'
        for (let i=0; i<data.courses.length; i++){
            // Find a better way of handling data
            if (data.courses[i].code === code){


                createRow(data.courses[i].name,data.courses[i].code,data.courses[i].dept);
                // document.getElementById("name").innerHTML = "Code: "+data.courses[i].code +"<br> Credit: "+ data.courses[i].credit + "<br>Dept: " + data.courses[i].dept + "<br>Description: " + data.courses[i].desc + "<br>Course Name: " + data.courses[i].name;            
                // console.log(data.courses[i]);
                break;
            }
        }
    }
    getThing();
}

function createRow(name, code, dept){
    // Craete post
    const post = document.createElement('div');
    post.setAttribute('class', 'row');
    post.innerHTML = "<p> "+name+" "+code+", "+dept+"</p>";
    post.style.fontSize = '1.25rem'
    post.style.width = '700px';
    post.style.height = '50px';
    post.style.background = "black";

    const table = document.getElementById('table');
    let profs = ['Jackie','Marzieh', 'Andriy', 'Natasha'];
    let secs = ['M','N', 'O', 'P'];


    var row = table.insertRow(index++);

    // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);

    cell1.innerHTML = secs[Math.floor(Math.random() * secs.length)];
    cell2.innerHTML = profs[Math.floor(Math.random() * profs.length)];
    cell3.innerHTML = dept;
    cell4.innerHTML = code;
}

let movies = [];
let colors = ['lightskyblue','lavenderblush','palegreen','salmon','aquamarine', 'aqua', 'pink', 'plum', 'peachpuff', 'moccasin'] ;

// example {id:1592304983049, title: 'Deadpool', year: 2015}
const addMovie = (ev)=>{
    ev.preventDefault();  //to stop the form submitting
    
    let input = document.getElementById('title').value;

    const date = new Date();
    var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    var day = days[ date.getDay() ];
    var month = months[ date.getMonth() ];

    if (input.length == 0){
        console.log('err');
    } 
    else {

        let movie = {
            id: ""+month+" "+date.getDate()+", "+date.getFullYear(),
            title: document.getElementById('title').value,
        }

        movies.push(movie);
        document.forms[0].reset(); // to clear the form for the next entries
        //document.querySelector('form').reset();

        //for display purposes only
        console.warn('added' , {movies} );
        let pre = document.querySelector('#msg pre');
        // pre.textContent = '\n' + JSON.stringify(movies, '\t', 2);

        // New Code:
        let m = JSON.stringify(movies[movies.length-1].title);
        // m.replace(/['"]+/g, '');
        let d = JSON.stringify(movies[movies.length-1].id);
        // pre.textContent = m+", "+d+"\n";
        createPosts(m,d);
        // End


        //saving to localStorage
        localStorage.setItem('MyMovieList', JSON.stringify(movies) );
    // localStorage.setItem('MyMovieList', JSON.stringify(movies).title );
    }
    
}
    document.addEventListener('DOMContentLoaded', ()=>{
        document.getElementById('btn').addEventListener('click', addMovie);
    
});


function createPosts(m, d){
    const name = window.localStorage.getItem('user');

    // Craete post
    const post = document.createElement('div');
    post.setAttribute('class', 'post');
    post.innerHTML = "<p> "+name+" says: "+m+", "+d+"</p>";
    post.style.fontSize = '1.25rem'
    post.style.width = '700px';
    post.style.height = '50px';
    post.style.background = colors[Math.floor(Math.random() * 6)];

    // Append post
    const posts = document.getElementById('posts');
    posts.prepend(post);
}