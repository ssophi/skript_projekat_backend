function init() {

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];
    console.log("token je ", token)

    fetch('http://127.0.0.1:5000/admin/zaposleni', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then( res => res.json() )
        .then( data => {
            const tabela = document.getElementById('tabela');

            for(i=0;i<data.length;i++){
                tabela.innerHTML += `<tr> <td> ${data[i].username} </td>, <td>${data[i].email} </td>, <td> ${data[i].ime} </td>, <td> ${data[i].tip} </td> </tr>`;
            }
        
        });
        document.getElementById('btn').addEventListener('click', e => {
            console.log("prelazni token je ", token);
            document.cookie = `token=${token}';SameSite=Lax`;
            console.log('kuki je ', document.cookie);
            window.location.href = '/admin/zaposleni';  
        });

    document.getElementById('logout').addEventListener('click', e => {
       
        document.cookie = `token=${token};SameSite=Lax`;
        window.location.href = 'login.html';
    });
}