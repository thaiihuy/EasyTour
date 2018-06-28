const flatListData = () => (
    fetch('http://easytour.tk/api/tour',
    {   
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        }
    })
    .then(res => res.json())
    .catch((error)=>{
        console.log(error);
    })
);

export default flatListData;