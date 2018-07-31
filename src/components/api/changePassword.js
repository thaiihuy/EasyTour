const ChangePassword = (id,password) => (
    fetch('http://easytour.tk/api/changePassword/'+id,
    {   
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify({password})
    })
    .then(res=>res.json())
);

export default ChangePassword;