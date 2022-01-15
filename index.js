const goldTableBody = document.querySelector(".goldTableBody")
const metalsTableBody = document.querySelector(".metalsTableBody")
const input = document.querySelector("#inputCurrency");
submitbtn = document.querySelector("#submit");

submitbtn.addEventListener('click', fetchPrice);
document.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        fetchPrice();
    }
});

async function fetchPrice() {
    if(inputCheck()){
        console.log("Fetching Price");
        const inputValue = input.value.toUpperCase();
        console.log("In Frontend and Input is ", inputValue);
        const priceInfo = await fetch('http://localhost:5000/getPrice',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ input: inputValue })
            }).then(response => response.json());

        displayTabledata(priceInfo, inputValue);
    }

    function displayTabledata(priceInfo, inputValue) {
        console.log("Returned to Frontend with ", priceInfo);

        let tableHTML1 = '';
        for (let i = 1; i <= 24; i = i + 1) {
            let currentKarat = `XAU_${i}K`
            if (i % 2) {
                tableHTML1 += `<tr>
            <td>	${i} Karat Gold Price</td>
            <td>	${(priceInfo[currentKarat] * priceInfo['INR']).toFixed(2)}</td>
            <td>	${(priceInfo[currentKarat]).toFixed(2)}</td>
            <td>	${(priceInfo[currentKarat] * priceInfo['EUR']).toFixed(2)}</td>
            <td>	${(priceInfo[currentKarat] * priceInfo[inputValue]).toFixed(2)}</td>
          </tr>`
            }
            else {
                tableHTML1 += `<tr class='table-secondary'>
            <td>	${i} Karat Gold Price</td>
            <td>	${(priceInfo[currentKarat] * priceInfo['INR']).toFixed(2)}</td>
            <td>	${(priceInfo[currentKarat]).toFixed(2)}</td>
            <td>	${(priceInfo[currentKarat] * priceInfo['EUR']).toFixed(2)}</td>
            <td>	${(priceInfo[currentKarat] * priceInfo[inputValue]).toFixed(2)}</td>
          </tr>`
            }
        }

        goldTableBody.innerHTML = tableHTML1;

        let tableHTML2 = ``;

        tableHTML2 = `<tr>
            <td>	Silver</td>
            <td>	${(priceInfo['XAG'] * priceInfo['INR']).toFixed(2)}</td>
            <td>	${(priceInfo['XAG']).toFixed(2)}</td>
            <td>	${(priceInfo['XAG'] * priceInfo['EUR']).toFixed(2)}</td>
            <td>	${(priceInfo['XAG'] * priceInfo[inputValue]).toFixed(2)}</td>
            </tr>

            <tr class="table-secondary">
            <td>	Platinum</td>
            <td>	${(priceInfo['PL'] * priceInfo['INR']).toFixed(2)}</td>
            <td>	${(priceInfo['PL']).toFixed(2)}</td>
            <td>	${(priceInfo['PL'] * priceInfo['EUR']).toFixed(2)}</td>
            <td>	${(priceInfo['PL'] * priceInfo[inputValue]).toFixed(2)}</td>

            </tr>

            <tr>
            <td>	Palladium</td>
            <td>	${(priceInfo['PA'] * priceInfo['INR']).toFixed(2)}</td>
            <td>	${(priceInfo['PA']).toFixed(2)}</td>
            <td>	${(priceInfo['PL'] * priceInfo['EUR']).toFixed(2)}</td>
            <td>	${(priceInfo['PL'] * priceInfo[inputValue]).toFixed(2)}</td>

            </tr>
            
            
            `


        metalsTableBody.innerHTML = tableHTML2;
    }
    
}


function inputCheck (){
    let word = input.value.trim();
    let wordlength = word.length;
    console.log("Data type ",typeof word)
    if (wordlength > 3 || wordlength < 3) {
        alert("Wrong Input, Try Again");
    }
    else{
        return true;
    }
}
