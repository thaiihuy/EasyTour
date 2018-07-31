const SendFB = (noidung,giodang,id_khachhang) => (
    fetch('http://easytour.tk/api/phanhoi',
    {   
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify({noidung,giodang,id_khachhang})
    })
    .then(res=>res.json())
);

export default SendFB;