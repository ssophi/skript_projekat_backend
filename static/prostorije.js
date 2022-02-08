function init() {

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];
    console.log("prostorije token ", token)


    fetch('http://127.0.0.1:5000/admin/prostorije', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then( res => res.json() )
        .then( data => {
            // const tabela = document.getElementById('tabela');

            // for(i=0;i<data.length;i++){
            //     tabela.innerHTML += `<tr> <td> ${data[i].username} </td>, <td>${data[i].email} </td>, <td> ${data[i].ime} </td>, <td> ${data[i].tip} </td> </tr>`;
            // }
        
        });
        document.getElementById('btn').addEventListener('click', e => {
        
            window.location.href = '/admin/addUser';
                  
        });

    document.getElementById('logout').addEventListener('click', e => {
        document.cookie = `token=;SameSite=Lax`;
        window.location.href = 'login.html';
    });
}