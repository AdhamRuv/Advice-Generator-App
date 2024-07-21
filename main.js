const adviceNum = document.querySelector('.num');
const adviceContent = document.querySelector('.advice-content');
const button = document.querySelector('.button');

// const getData = (apiLink)=>{
//     return new Promise((res, rej)=>{
//         let myRequest = new XMLHttpRequest();
//         myRequest.onload = function(){
//             if(this.readyState === 4 && this.status === 200){
//                 res(JSON.parse(this.responseText));
//             } else{
//                 rej(Error(`Data Not Found`));
//             }
//         }
//         myRequest.open('GET', apiLink);
//         myRequest.send();
//     });
// };

const getData = async (apiLink) => {
    try {
        const response = await fetch(apiLink);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const data = await response.json();
        return data
    } catch (error) {
        console.error('Error fetching data:', error.message);
    };
};

let updateData = (res) => {
    const id = res.slip.id;
    const advice = res.slip.advice;
    adviceNum.innerHTML = `#${id}`;
    adviceContent.innerHTML = `"${advice}"`;
    const adviceContentElement = document.querySelector('.advice-content');
    adviceContentElement.style.animation = 'none';
    void adviceContentElement.offsetWidth;
    adviceContentElement.style.animation = 'advContent .75s ease-in-out'
}
getData('https://api.adviceslip.com/advice')
    .then(updateData)
    .catch((err)=>{
        console.log(err);
    });
    
button.onclick = ()=>{
    getData('https://api.adviceslip.com/advice')
    .then(updateData)
}