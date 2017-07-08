let names = ["Konrad", "Basia", "Habcio", "Hjena"];
let state = {
    debts: [],
    articles: []
}
const namesLength = names.length;

for (var i = 0; i < namesLength; i++){
    state.debts.push([]);
    state.articles.push([]);
    for (var j = 0; j < namesLength; j++){
        state.debts[i].push(0);
        state.articles[i].push([]);
    }
}

console.log(state.articles)

function increaseDebts(ktoKupil, komuKupil, howMuch, what = ""){
    let whoBought = names.indexOf(ktoKupil);
    //jak ktos kupil jednej osobie
    if (komuKupil !== 'all') {
        var forWhom = names.indexOf(komuKupil);
        state.debts[whoBought][forWhom] += howMuch;
        //jesli podano konkretny artykul
        if(what!==""){
            state.articles[whoBought][forWhom].push({article: what, price: howMuch})
        }
    //jak ktos kupil wszystkim    
    } else if (komuKupil === 'all') {
        for(var i = 0; i < namesLength; i++){
            state.debts[whoBought][i] += howMuch/namesLength;
            if(what!==""){
                state.articles[whoBought][i].push({article: what, price: howMuch/namesLength})
        }
        }
    } else {
    //kupil sobie    
    }
    
    
}

//who - kto kupil, whom - komu kupil (imie albo all), howMuch - ile wydal 
increaseDebts('Hjena', 'all', 90, 'jedzenie');
increaseDebts('Hjena', 'Habcio', 15, 'szlugi');
increaseDebts('Konrad', 'Basia', 10);
increaseDebts('Habcio', 'all', 70, 'benzyna');
increaseDebts('Hjena', 'all', 120, 'benzyna');

function showTableReport(){
    console.log('Kto wisi:');
    console.log(names);
    for(var i = 0; i < namesLength; i++){
        console.log(names[i], state.debts[i])
    }
}

function showReport(name){
    let reportedPerson = names.indexOf(name);
    //kto mi wisi
    for(var i = 0; i < namesLength; i++){
        let kwota = state.debts[i][reportedPerson] - state.debts[reportedPerson][i];
        let owesOrIsOwed = kwota>0 ? 'wisi' : 'odbiera od ';
        kwota = kwota > 0 ? kwota : -1 * kwota;
        if (i !== reportedPerson){
            console.log(name, owesOrIsOwed, names[i], kwota);
        } else {
            //nuttin, stroking bone
        }
        
    }
}

//kto kupil (name) komu co
function showDetailedReport(buyer, whoGotStuff = ''){
    console.log('zakupy zrobione przez ', buyer);
    let reportedPerson = names.indexOf(buyer);
    if (whoGotStuff === ''){
        console.log(' dla wszystkich');
        for(var i = 0; i < namesLength; i++){
            for(let item of state.articles[reportedPerson][i]){
                if (item!==undefined){
                    console.log(name, 'kupil', names[i], item.article, ' za ', item.price, 'zl');
                }
            }
            
        }
    } else {
        console.log(' dla ', whoGotStuff);
        let personThatGotStuff = names.indexOf(whoGotStuff);
        for(let item of state.articles[reportedPerson][personThatGotStuff]){
                if (item!==undefined){
                    console.log(buyer, 'kupil', names[personThatGotStuff], item.article, ' za ', item.price, 'zl');
                }
            }    
    }
    
}
//raport dla wszystkich
for (let name of names){
    showReport(name);
}
console.log('//////////////////////////////////////////')
showTableReport();

console.log('//////////////////////////////////////////')
console.log(showDetailedReport('Hjena', 'Habcio'));
console.log('//////////////////////////////////////////')