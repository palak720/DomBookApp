document.getElementById('loginForm').addEventListener('submit',function(event)){
    event.preventDefault();
    const email =document.getElementById('email').value;
    const password =document.getElementById('password').value;
    
    if(email === 'admin@empher.com' && password==='password'){
        alert('logged in as admin');
        localStorage.setItem('loginData',JSON.stringify({email,role:'admin'}));
        window.location.href='admin.html';
    }else if(email && password){
        alert('Logged in as user')
        localStorage.set('loginData',JSON.stringify({email ,role:'user'}));
        window.location.href='books.html'
    }else{
        alert('Incorrect email or password');
    }
    }
