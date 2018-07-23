const searchDate = (startDate,endDate) => (
    fetch('http://easytour.tk/api/search',
    {   
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({startDate,endDate})
    })
    .then(res => res.json())
);

export default searchDate;