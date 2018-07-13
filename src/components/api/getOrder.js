const GetOrder = (key) => (
    fetch('http://easytour.tk/api/OrderHistory/'+key,
    {   
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
    })
    .then(res => res.json())
);

export default GetOrder;