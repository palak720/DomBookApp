document.addEventListener('DOMContentLoaded',() => {
    const loginData =JSON.parse(localStorage.getItem('loginData'));
    if(!loginData || loginData.email !=='admin@empher.com'){
        alert('Admin not logged in');
        window.location.href ='index.html';
    }

    document.getElementById('addBookForm').addEventListener('submit',handledAddBook);
    loadBooks;
});

function handledAddBook(event){
    event.preventDefault();
    const title =document.getElementById('title').value;
    const author =document.getElementById('author').value;
    const category =document.getElementById('category').value;
      
    const bookData = {
        
            "title": "Book Title",
            "author": "Author Name",
            "category": "Fictional",
            "isAvailable": true,
            "isVerified": false,
            "borrowedDays": null,
            "imageUrl": "https://m.media-amazon.com/images/I/71ZB18P3inL._SY522_.jpg"
          };

          fetch('https://universal-snowy-visitor.glitch.me',{
           method: 'POST',
           headers:{
            'Content -Type':'application/json'
           },
           body:JSON.stringify(bookData)
          })
          .then(res =>res.json())
          .then(data => {
            alert('Book added successfully');
            loadBooks;
          })
          .catch(err => console.err('Err adding book:',err));
    }

    function loadBooks(){
        fetch('https://universal-snowy-visitor.glitch.me')
        .then(res =>res.json())
        .then(data => displayBooks(data))
        .catch(err => console.err('Err loading book:',err));
    }

    function displayBooks(books){
        const grid =document.getElementById('bookGrid');
        grid.innerHTML ='';
        books.forEach(book => {
            const card =document.createElement('div');
            card.innerHTML =`
            <h3>${book.title}<h3>
            <p>Author:${book.category}</p>
            <p>Availability:${book.isAvailability}</p>
            ${book.borrowedDays ? <p>borrowed Days:${book.borrowedDays}</p>:''}
            <button onclick ="verifyBook(${book.id})">Verify</button>
            <button onclick ="deleteBook(${book.id})">Delete</button>
            `;
            grid.appendChild(card);
        });
    }
     
    function verifyBook(boookID) {
        alert('Book ID ${bookID} verified')
    }
    function deleteBook(bookID){
        fetch('https://universal-snowy-visitor.glitch.me',{
           method: 'DELETE'
        })
        .then(() =>{
         alert('Book deleted succedfully');
         loadBooks();
        })
        .catch(err => console.err('Err deleting book',err));
    }