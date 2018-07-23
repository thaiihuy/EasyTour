const EditInfo = (key,ten,email,sdt) => (
    fetch('http://easytour.tk/api/khachhang/'+key,
    {   
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify({ten,email,sdt})
    })
    .then(res=>res.json())
);

export default EditInfo;