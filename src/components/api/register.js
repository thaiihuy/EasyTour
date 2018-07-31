const register = (username,ten,sdt,password) => (
    fetch('http://easytour.tk/api/auth/register',
    {   
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({username,ten,sdt,password})
    })
    .then(res => res.json())
);

export default register;