const signIn = (username, password) => (
    fetch('http://easytour.tk/api/auth/login',
    {   
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(res => res.json())
);

export default signIn;