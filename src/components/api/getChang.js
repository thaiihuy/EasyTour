const GetChang = (key) => (
    fetch('http://easytour.tk/api/chitiettour/tour/'+key,
    {   
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
    })
    .then(res => res.json())
);

export default GetChang;