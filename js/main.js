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

    const allElementsData = [];
    const allCreatedRows = [];

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
        
        allElementsData.push(element)
        allCreatedRows.push(tableRow)
    })
    
        let maxNumberNow = 1;
    
        const tableHeadId = document.querySelector('.table-head-id')
        const tableHeadName = document.querySelector('.table-head-name')
        const tableHeadCity = document.querySelector('.table-head-city')
        const tableHeadIncome = document.querySelector('.table-head-income')


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


    function addBeforeNumberPrevious() {
        if (maxNumberNow >= 10) {
            beforeNumberPrevious.innerHTML = maxNumberNow - 9;
            beforeNumberPrevious.classList.remove('nav-button-non-active')
        } else {
            beforeNumberPrevious.innerHTML = '...';
            beforeNumberPrevious.classList.add('nav-button-non-active')
        }
    }

    function addNumberPrevious() {
        if (maxNumberNow >= 5) {
            numberPrevious.innerHTML = maxNumberNow - 4;
            numberPrevious.classList.remove('nav-button-non-active')
        } else {
            numberPrevious.innerHTML = '...';
            numberPrevious.classList.add('nav-button-non-active')
        }
    }

    function addPrevious() {
        if (maxNumberNow > 1) {
            previous.classList.remove('nav-button-non-active')
        } else {
            previous.classList.add('nav-button-non-active')
        }
    }

    function addExelent() {
        
        exelentNumber.innerHTML = maxNumberNow;
    }

    function addNext() {
        if (maxNumberNow < 30) {
            next.classList.remove('nav-button-non-active')
        } else {
            next.classList.add('nav-button-non-active')
        }
    }

    function addNumberNext() {
        if (maxNumberNow <= 26) {
            numberNext.innerHTML = maxNumberNow + 4;
            numberNext.classList.remove('nav-button-non-active')
        } else {
            numberNext.innerHTML = '...';
            numberNext.classList.add('nav-button-non-active')
        }
    }

    function addAfterNumberNext() {
        if (maxNumberNow <= 21) {
            afterNumberNext.innerHTML = maxNumberNow + 9;
            afterNumberNext.classList.remove('nav-button-non-active')
        } else {
            afterNumberNext.innerHTML = '...';
            afterNumberNext.classList.add('nav-button-non-active')
        }
    }
    
    function addNewPage() {
        if (this === beforeNumberPrevious) {
            if (maxNumberNow >= 10){
                maxNumberNow = maxNumberNow - 10;
            }
        } else if (this === numberPrevious) {
            if (maxNumberNow > 5){
                maxNumberNow = maxNumberNow - 5;

            }
        } else if (this === previous) {
            if (maxNumberNow > 1){
                maxNumberNow = maxNumberNow - 1;

            }
        } else if (this === next) {
            if (maxNumberNow < 30){
                maxNumberNow = maxNumberNow + 1;
            }
        } else if (this === numberNext) {
            if (maxNumberNow <= 25){
                maxNumberNow = maxNumberNow + 5;
            }
        } else if (this === afterNumberNext) {
            if (maxNumberNow <= 20){
                maxNumberNow = maxNumberNow + 10;
            }
        }  
        addBeforeNumberPrevious()
        addNumberPrevious()
        addPrevious()
        addExelent()
        addNext()
        addNumberNext()
        addAfterNumberNext()

        newPageFunction();
    }
    
    const beforeNumberPrevious = document.querySelector('.before-number-previous')
    const numberPrevious = document.querySelector('.number-previous')
    const previous = document.querySelector('.previous')
    const exelentNumber = document.querySelector('.exelent-number')
    const next = document.querySelector('.next')
    const numberNext = document.querySelector('.number-next')
    const afterNumberNext = document.querySelector('.after-number-next')
    
    previous.addEventListener('click', addNewPage)
    next.addEventListener('click', addNewPage)
    numberPrevious.addEventListener('click', addNewPage)
    numberNext.addEventListener('click', addNewPage)
    afterNumberNext.addEventListener('click', addNewPage)
    beforeNumberPrevious.addEventListener('click', addNewPage)

    

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
        const goodTable = allElementsData.find(e => e.id == contentId);

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


    function findData() {
        
        const thisId = this.querySelector('.table-td-id').innerHTML
        
        const finalObject = allElementsData.find(e => e.id == thisId)

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
            return mounth === 12 && year === 2019;
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

        checkDate()
    }
    
    function sortById() {
        if(this !== undefined){
            maxNumberNow = 1;
            addNewPage();
        }

        const resultOfSort = allCreatedRows
        .sort((a, b) => {
            const aValue = Number(a.querySelector('.table-td-id').innerHTML)
            const bValue = Number(b.querySelector('.table-td-id').innerHTML)
            
            return aValue > bValue? 1 : -1;

        })
        .filter((element, index) => {
            if (index < (maxNumberNow * 10) && index > ((maxNumberNow * 10) - maxNumber -1)){
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
            maxNumberNow = 1;
            addNewPage()
        }

        const resultOfSort = allCreatedRows
        .sort((a, b) => {
            const aValue = a.querySelector('.table-td-name').innerHTML
            const bValue = b.querySelector('.table-td-name').innerHTML

            return aValue > bValue? 1 : -1;

        })
        .filter((element, index ) => {
            if (index < (maxNumberNow * 10) && index > ((maxNumberNow * 10) - maxNumber -1)){
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
            maxNumberNow = 1;
            addNewPage()
        }

        const resultOfSort = allCreatedRows
        .sort((a, b) => {
            const aValue = a.querySelector('.table-td-city').innerHTML
            const bValue = b.querySelector('.table-td-city').innerHTML
            
            return aValue > bValue? 1 : -1;
        })
        .filter((element, index) => {
            if (index < (maxNumberNow * 10) && index > ((maxNumberNow * 10) - maxNumber -1)){
                return element;
            }
        })
        .map(element => tableBody.appendChild(element))

        resultOfSort.forEach(e => {
            e.addEventListener('click', findData)
        })
    }

    tableHeadCity.addEventListener('click', sortByCity)


    function sortByIncome() {
        if(this !== undefined){
            maxNumberNow = 1;
            addNewPage()
        }

        const resultOfSort = allCreatedRows
        .sort((a, b) => {
            const aValue = a.querySelector('.table-td-valueAll').innerHTML
            const bValue = b.querySelector('.table-td-valueAll').innerHTML

            return aValue > bValue? -1 : 1;
        })
        .filter((element, index) => {
            if (index < (maxNumberNow * 10) && index > ((maxNumberNow * 10) - maxNumber -1)){
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

}))