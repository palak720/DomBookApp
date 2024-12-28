document.addEventListener('DOMContentLoaded',() => {
    const loginData =JSON.parse(localStorage.getItem('loginData'));
    if(!loginData || loginData.email !=='admin@empher.com'){
        alert('Admin not logged in');
        window.location.href ='index.html';
    }
    document.getElementById('showAvailableBooks').addEventListener('click',loadAvailableBooks);
    document.getElementById('showBorrowedBooks').addEventListener('click',loadBorrowedBooks);

    loadAvailableBooks();
});

function loadAvailableBooks(){
    fetch('https://universal-snowy-visitor.glitch.me')
    .then(res =>res.json())
    .then(data => {
        const availableBooks =data.filter(book => book.availability === 'Available')
        displayBooks(availableBooks);
    })
    .catch(err => console.error('err loading books:',err));
}
function loadBorrowedBooks(){
    fetch('https://universal-snowy-visitor.glitch.me')
    .then(res =>res.json())
    .then(data => {
        const borrowedBooks =data.filter(book => book.availability === 'Borrowed')
        displayBooks(borrowedBooks);
    })
    .catch(err => console.error('err loading books:',err));
}

function displayBooks(books){
    const grid =document.getElementById('bookGrid');
    grid.innerHTML ='';
    books.forEach(book => {
        const card =document.createElement('div');
        card.className ='card';
        card.innerHTML =`
        <h3>${book.title}<h3>
        <p>Author:${book.category}</p>
        <p>Availability:${book.isAvailability}</p>
        ${book.borrowedDays ? <p>borrowed Days:${book.borrowedDays}</p> :''}
        $book.availability === 'Available' <button onclick ="boorrowbook(${book.id})">Borrow</button> : "}
        `;
        grid.appendChild(card);
    });
}

function borrowBook(bookID) {
    const borrowBooks =10;

    fetch('https://universal-snowy-visitor.glitch.me',{
        method: 'POST',
        headers:{
         'Content -Type':'application/json'
        },
        body:JSON.stringify({
            availability:'Borrowed',
            borrowedDays: borrowDays
        })
       })
       .then(res =>res.json())
          .then(data => {
            alert('Book borrowed successfully');
            loadAvailableBooks;
          })
          .catch(err => console.err('Err borrowing book:',err));
    }

