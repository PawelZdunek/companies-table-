let companyData = 'https://recruitment.hal.skygate.io/companies'
let importCompanyData = axios.get(companyData)

const table = [];

for (let i = 1; i <= 300; i++) {
    let one = `https://recruitment.hal.skygate.io/incomes/${i}`
    let importOne = axios.get(one);
    table.push(importOne)
}

// console.log(table);

const tableBody = document.querySelector('.table-body')

const maxNumber = 10;


const tableTwo = axios.all([importCompanyData, ...table]).then(axios.spread((...responses) => {
    const importCompanyData = responses[0]

    const data = importCompanyData.data

    data.sort((a, b) => a.id -b.id)

    data.forEach(element => {
        element.value = responses[element.id].data.incomes
    });

    const lolo = [];
    const holo = [];

    data.forEach( element => {
        const valium = element.value

        const score = valium.reduce((acc, element) => {
          return acc + Number(element.value)
        }, 0)  
        const scoreRound = score.toFixed(2);
        element.valueAll = scoreRound;
        
        const tableRow = document.createElement('tr');
        tableRow.classList.add('table-row')
        
        for(let [key, value] of Object.entries(element)) {
            if (key == 'id' || key == 'name' || key == 'city' || key == 'valueAll') { 
                let tableElement = document.createElement('td');
                tableElement.innerHTML = value;
                tableRow.appendChild(tableElement)
                tableElement.classList.add(`table-td`)
                tableElement.classList.add(`table-td-${key}`)
            } 
        }
        
        lolo.push(element)
        holo.push(tableRow)
    })
    
            let maxNumberId = maxNumber;
            let maxNumberName = maxNumber;
            let maxNumberCity = maxNumber;
            let maxNumberIncome = maxNumber;
    
        const buttonOne = document.querySelector('.number-button-1')
    
        const tableHeadId = document.querySelector('.table-head-id')
        const tableHeadName = document.querySelector('.table-head-name')
        const tableHeadCity = document.querySelector('.table-head-city')
        const tableHeadIncome = document.querySelector('.table-head-income')


    function newPage() {
        const inputNumber = this.innerHTML
        if(tableHeadId.classList.contains('table-head-sort')) {
            maxNumberId = inputNumber * maxNumber;
        } else if(tableHeadName.classList.contains('table-head-sort')) {
            maxNumberName = inputNumber * maxNumber;
        } else if(tableHeadCity.classList.contains('table-head-sort')) {
            maxNumberCity = inputNumber * maxNumber;
        } else if(tableHeadIncome.classList.contains('table-head-sort')) {
            maxNumberIncome = inputNumber * maxNumber;
        } else {console.log('error newPage function')}
    }

    function newPageFunction() {
        if(tableHeadId.classList.contains('table-head-sort')) {
            rowRemove();
            sortById();
        } else if(tableHeadName.classList.contains('table-head-sort')) {
            rowRemove();
            sortByName();
        } else if(tableHeadCity.classList.contains('table-head-sort')) {
            rowRemove();
            sortByCity();
        } else if(tableHeadIncome.classList.contains('table-head-sort')) {
            rowRemove();
            sortByIncome();
        } else {console.log('error newPageFunction function')}
    }

    function addColor() {

        const buttons = document.querySelectorAll('.number-button')
        buttons.forEach(e => e.classList.remove('number-button-active'))

        this.classList.add('number-button-active')
    }

    const tableIndexBox = document.querySelector('.table-index-box')

    for(let i = 1; i <= (data.length / maxNumber); i++){
        let numberButton = document.createElement('button');
        numberButton.innerHTML = i;
        tableIndexBox.appendChild(numberButton)
        numberButton.classList.add(`number-button`)
        numberButton.classList.add(`number-button-${i}`)

        numberButton.addEventListener('click', newPage)
        numberButton.addEventListener('click', newPageFunction)
        numberButton.addEventListener('click', addColor)

        if (i === 1){
            numberButton.classList.add('number-button-active')  
        }
    }

    function rowRemove() {
        const list = document.querySelectorAll('.table-row')
        list.forEach(row => row.remove())
    }
    
    function removeClass(){
        
        tableHeadId.classList.remove('table-head-sort')
        tableHeadName.classList.remove('table-head-sort')
        tableHeadCity.classList.remove('table-head-sort')
        tableHeadIncome.classList.remove('table-head-sort')
        
        this.classList.add('table-head-sort')
        
        const list = document.querySelectorAll('.table-row')
        list.forEach(row => row.remove())

        const buttons = document.querySelectorAll('.number-button')
        buttons.forEach(e => e.classList.remove('number-button-active'))

        const buttonOne = document.querySelector('.number-button-1')
        buttonOne.classList.add('number-button-active')   
    }
    
    tableHeadId.addEventListener('click', removeClass)
    tableHeadName.addEventListener('click', removeClass)
    tableHeadCity.addEventListener('click', removeClass)
    tableHeadIncome.addEventListener('click', removeClass)

    function checkDate() {
        const contentId = document.querySelector('.content-id-p').innerHTML
        const goodTable = lolo.find(e => e.id == contentId);

        const startDateValue = document.querySelector('#start-date').value
        const endDateValue = document.querySelector('#end-date').value
        
        const incomesTable = goodTable.value;
        
        const onlyData = incomesTable.map(e => {
            const elementData = e.date
            const elementDateTable = elementData.split('T');
            e.date = elementDateTable[0]
            return e
        })
        
        const goodDateIncomes = onlyData.filter(e => {
            return e.date > startDateValue && e.date < endDateValue; 
        })
        
        const totalIncome = goodDateIncomes.reduce((acc, e) => {
            return acc + Number(e.value)
        }, 0)

        const averageIncom = totalIncome.toFixed(2) / goodDateIncomes.length
        
        const totalDateIncome = document.querySelector('.content-total-date-income-p')
        totalDateIncome.innerHTML = totalIncome.toFixed(2)
        
        const averageDateIncome = document.querySelector('.content-average-date-income-p')
        if (averageIncom){
            averageDateIncome.innerHTML = averageIncom.toFixed(2)
        } else {
            averageDateIncome.innerHTML = '0.00';
        }

    }
    const startDate = document.querySelector('#start-date')
    const endDate = document.querySelector('#end-date')
    startDate.addEventListener('change', checkDate)
    endDate.addEventListener('change', checkDate)


    const nowData = new Date();
    const nowYear = nowData.getFullYear();
    const nowMounth = nowData.getMonth() + 1;

    function findData() {
        
        const thisId = this.querySelector('.table-td-id').innerHTML
        
        const finalObject = lolo.find(e => e.id == thisId)

        const boxId = document.querySelector('.content-id-p')
        boxId.innerHTML = finalObject.id

        const boxName = document.querySelector('.content-name-p')
        boxName.innerHTML = finalObject.name

        const boxCity = document.querySelector('.content-city-p')
        boxCity.innerHTML = finalObject.city

        const boxTotalIncome = document.querySelector('.content-total-income-p')
        boxTotalIncome.innerHTML = finalObject.valueAll

        const valueTable = finalObject.value

        // valueTable.filter((a, b) => {

        // })

        const onlyData = valueTable.map(e => {
            const elementData = e.date
            const elementDateTable = elementData.split('T');
            e.date = elementDateTable[0]
            return e
        })

        const sortedData = onlyData.filter(e =>  {
            const dateTable = e.date.split('-') 
            const year = Number(dateTable[0])
            const mounth = Number(dateTable[1])
            return mounth === 1 && year === nowYear;
            // return mounth === (nowMounth - 1) && year === nowYear;
        })    
        

        const sortedDataSum = sortedData.reduce((acc, e) => {
            return acc + Number(e.value);
        }, 0)

        const averageIncome =  finalObject.valueAll / valueTable.length;

        const boxAverageIncome = document.querySelector('.content-average-income-p');
        boxAverageIncome.innerHTML = (averageIncome).toFixed(2);

        const boxLastMounthIncome = document.querySelector('.content-last-mounth-income-p');
        boxLastMounthIncome.innerHTML = (sortedDataSum).toFixed(2);

        const containerContent = document.querySelector('.container-content');
        containerContent.classList.add('container-content-min');

        const buttonClosecontent = document.querySelector('.close-content');
        buttonClosecontent.addEventListener('click' ,function() {
            containerContent.classList.remove('container-content-min');
        })
    }
    
    function sortById() {
        if(this !== undefined){
            maxNumberId = maxNumber;
            // tableHeadId.classList.toggle('sorte-by')
        }

        const resultOfSort = holo
        .sort((a, b) => {
            const aValue = Number(a.querySelector('.table-td-id').innerHTML)
            const bValue = Number(b.querySelector('.table-td-id').innerHTML)
            
            // if(tableHeadId.classList.contains('sorte-by')){
                return aValue > bValue? 1 : -1;
            // }else{
            //      return aValue > bValue? -1 : 1;
            // }
        })
        .filter((element, index) => {
            if (index < maxNumberId && index > (maxNumberId - maxNumber -1)){
                return element;
            }
        })
        .map(element => tableBody.appendChild(element))

        resultOfSort.forEach(e => {
            e.addEventListener('click', findData)
        })
    }

    tableHeadId.addEventListener('click', sortById)

    function sortByName() {
        if(this !== undefined){
            maxNumberName = maxNumber;
            // tableHeadName.classList.toggle('sorte-by')
        }

        const resultOfSort = holo
        .sort((a, b) => {
            const aValue = a.querySelector('.table-td-name').innerHTML
            const bValue = b.querySelector('.table-td-name').innerHTML
            
            // if(tableHeadName.classList.contains('sorte-by')){
                return aValue > bValue? 1 : -1;
            // } else{
                // return aValue > bValue? -1 : 1;
            // }
        })
        .filter((element, index ) => {
            if (index < maxNumberName && index > (maxNumberName - maxNumber -1)){
                return element;
            }
        })
        .map(element => tableBody.appendChild(element))

        resultOfSort.forEach(e => {
            e.addEventListener('click', findData)
        })
    }

    tableHeadName.addEventListener('click', sortByName)

    function sortByCity() {
        if(this !== undefined){
            maxNumberCity = maxNumber;
            // tableHeadCity.classList.toggle('sorte-by')
        }

        const resultOfSort = holo
        .sort((a, b) => {
            const aValue = a.querySelector('.table-td-city').innerHTML
            const bValue = b.querySelector('.table-td-city').innerHTML
            
            // if(tableHeadCity.classList.contains('sorte-by')){
                return aValue > bValue? 1 : -1;
            // } else{
            //     return aValue > bValue? -1 : 1;
            // }
        })
        .filter((element, index) => {
            if (index < maxNumberCity && index > (maxNumberCity - maxNumber -1)){
                return element;
            }
        })
        .map(element => tableBody.appendChild(element))

        resultOfSort.forEach(e => {
            e.addEventListener('click', findData)
        })
    }

    tableHeadCity.addEventListener('click', sortByCity)


    function sortByIncome(start) {
        if(this !== undefined){
            maxNumberIncome = maxNumber;
            // tableHeadIncome.classList.toggle('sorte-by')
        }

        const resultOfSort = holo
        .sort((a, b) => {
            const aValue = a.querySelector('.table-td-valueAll').innerHTML
            const bValue = b.querySelector('.table-td-valueAll').innerHTML
            
            // if(tableHeadIncome.classList.contains('sorte-by')){
                // return aValue > bValue? 1 : -1;
            // }else{
                return aValue > bValue? -1 : 1;
            // }
        })
        .filter((element, index) => {
            if (index < maxNumberIncome && index > (maxNumberIncome - maxNumber -1)){
                return element;
            }
        })
        .map(element => tableBody.appendChild(element))

        resultOfSort.forEach(e => {
            e.addEventListener('click', findData)
        })

    }

    tableHeadIncome.addEventListener('click', sortByIncome)
    sortByIncome()

    const loadViev = document.querySelector('.container-load');
    loadViev.classList.add('container-load-end')

    // const rows = document.querySelectorAll('.table-row')
    
    // console.log(rows)

    // console.log(lolo)
    // console.log(holo)

}))