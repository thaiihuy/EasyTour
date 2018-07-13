const sendOrder = (id_khachhang,id_tour,soluong,ngaydat,tonggia) => (
    fetch('http://easytour.tk/api/dattour',
    {   
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({id_khachhang,id_tour,soluong,ngaydat,tonggia})
    })
    .then(res => res.json())
);

export default sendOrder;