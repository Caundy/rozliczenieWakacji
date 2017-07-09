export function populateArrays(){
    for (var i = 0; i < this.state.names.length; i++){
        this.state.debts.push([]);
        this.state.articles.push([]);
        for (var j = 0; j < this.state.names.length; j++){
            this.state.debts[i].push(0);
            this.state.articles[i].push([]);
        }
    }
}

//who - kto kupil, whom - komu kupil (imie albo all), howMuch - ile wydal, opcjonalnie: co kupil
export const increaseDebt = (ktoKupil, komuKupil, howMuch, what = "") => {
    if (typeof ktoKupil === 'string' && typeof komuKupil === 'string' && typeof what === 'string' && typeof howMuch === 'number'){
        let whoBought = this.state.names.indexOf(ktoKupil);
        //jak ktos kupil jednej osobie i jako kupujacego wpisano poprawna osobe
        if (komuKupil !== 'all' && whoBought !== -1) {
            var forWhom = this.state.names.indexOf(komuKupil);
            if(forWhom !== -1){
                this.state.debts[whoBought][forWhom] += howMuch;
                //jesli podano konkretny artykul dopisujemy do listy kupionych artykulow
                if(what!==""){
                    this.state.articles[whoBought][forWhom].push({article: what, price: howMuch})
                }
            }
        //jak ktos kupil wszystkim    
        } else if (komuKupil === 'all') {
            for(var i = 0; i < this.state.names.length; i++){
                this.state.debts[whoBought][i] += howMuch/this.state.names.length;
                if(what!==""){
                    this.state.articles[whoBought][i].push({article: what, price: howMuch/this.state.names.length})
            }
            }
        } else {
        //kupil sobie    
        }
    } else {
        throw Error('zle typy inputu');
    }
}

//wyswietlenie danych w postaci tablicy
//os x - kto wisi
//os y - komu wisi
export function showTableReport(){
    console.log('Kto wisi:');
    console.log(this.state.names);
    for(var i = 0; i < this.state.names.length; i++){
        console.log(this.state.names[i], this.state.debts[i])
    }
}

//raport dla jednej osoby - jak stoi ze wszystkimi (komu wisi, od kogo odbiera hajs)
export function showReport(name){
    let reportedPerson = this.state.names.indexOf(name);
    //kto mi wisi
    for(var i = 0; i < this.state.names.length; i++){
        let kwota = this.state.debts[i][reportedPerson] - this.state.debts[reportedPerson][i];
        let owesOrIsOwed = kwota>0 ? 'wisi' : 'odbiera od ';
        kwota = kwota > 0 ? kwota : -1 * kwota;
        if (i !== reportedPerson){
            console.log(name, owesOrIsOwed, this.state.names[i], kwota);
        } else {
            //nuttin, stroking bone
        }
        
    }
}

//kto kupil (name) komu co
export function showDetailedReport(buyer, whoGotStuff = ''){
    console.log('zakupy zrobione przez ', buyer);
    let reportedPerson = this.state.names.indexOf(buyer);
    if (whoGotStuff === ''){
        console.log(' dla wszystkich');
        for(var i = 0; i < this.state.names.length; i++){
            for(let item of this.state.articles[reportedPerson][i]){
                if (item!==undefined){
                    console.log(buyer, 'kupil', this.state.names[i], item.article, ' za ', item.price, 'zl');
                }
            }
            
        }
    } else {
        console.log(' dla ', whoGotStuff);
        let personThatGotStuff = this.state.names.indexOf(whoGotStuff);
        for(let item of this.state.articles[reportedPerson][personThatGotStuff]){
                if (item!==undefined){
                    console.log(buyer, 'kupil', this.state.names[personThatGotStuff], item.article, ' za ', item.price, 'zl');
                }
            }    
    }
    
}
//zwykly raport dla wszystkich (kto komu wisi, od kogo odbiera)
//for (let name of this.state.names){
//    showReport(name);
//}

