const getData = () => {
    axios.get('https://recruitment.hal.skygate.io/companies').then(response => {
        const data = response.data


        const table = document.createElement('table');
        table.classList.add('initial-table');
        document.body.appendChild(table)

        const tableHead = document.createElement('thead');
        tableHead.classList.add('table-head');
        table.appendChild(tableHead)

        const tableHeadRow = document.createElement('tr');
        tableHeadRow.classList.add('table-head-row');
        tableHead.appendChild(tableHeadRow)

        for(let [key] of Object.entries(data[0])) {
                
            let tableHeadHeading = document.createElement('th');
            tableHeadHeading.classList.add(`table-head-heading`)   
            tableHeadHeading.innerHTML = key;
            tableHeadRow.appendChild(tableHeadHeading)
        }

        const tableBody = document.createElement('tbody');
        tableBody.classList.add('table-body');
        table.appendChild(tableBody)

        const tableRowsByName = () => {

            const list = document.querySelectorAll('.table-row')

            list.forEach(row => row.remove())

            data
            .sort((a, b) =>{
                return a.name > b.name? 1: -1;
            })
            .map(element =>{
            
            const tableRow = document.createElement('tr');
            tableRow.classList.toggle('table-row')

            for(let [key, value] of Object.entries(element)) {
                
                let tableElement = document.createElement('td');
                tableElement.innerHTML = value;
                tableRow.appendChild(tableElement)
                tableElement.classList.add(`table-td`)
                tableElement.classList.add(`table-td-${key}`)   
            }
        
            tableBody.appendChild(tableRow);
        })}

        const sortingButton = document.createElement('button');
        sortingButton.classList.add('sorting-button');
        document.body.appendChild(sortingButton)
        sortingButton.innerHTML = `Sort by Name`;

        sortingButton.addEventListener('click', tableRowsByName)


        const tableRows = data
        .sort((a, b) =>{
            return a.id - b.id
        })
        .map(element =>{
            
            const tableRow = document.createElement('tr');
            tableRow.classList.toggle('table-row')

            for(let [key, value] of Object.entries(element)) {
                
                let tableElement = document.createElement('td');
                tableElement.innerHTML = value;
                tableRow.appendChild(tableElement)
                tableElement.classList.add(`table-td`)
                tableElement.classList.add(`table-td-${key}`)   
            }
        
            tableBody.appendChild(tableRow);
        })

    })
}
getData();


const getDataIncomes = () => {
    axios.get('https://recruitment.hal.skygate.io/incomes/:id').then(response => {
        console.log(response);
    })
}

getDataIncomes();