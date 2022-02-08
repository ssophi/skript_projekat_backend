function init() {
    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    document.getElementById('btn').addEventListener('click', e => {
        e.preventDefault();
       console.log("usap");
        const data = {
            naziv: document.getElementById('naziv').value,
            trajanje: document.getElementById('trajanje').value,
            uslov_polaganja: document.getElementById('uslov').value
        };
       

        fetch('http://127.0.0.1:5000/admin/zaposleni', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`},
            body: JSON.stringify(data)
        })
            .then( res => res.json() )
            
            window.location.href = '/admin/kurs';
    });
}