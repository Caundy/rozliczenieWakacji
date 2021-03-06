import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import NameInputs from './NameInputs';
//import {increaseDebt, showReport, showTableReport, showDetailedReport} from './debts'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfPeople: 0,
      names: [],
      debts: [],
      articles: []
    };
}

  submitParticipant = (e) => {
    //zablokowanie przeladowania strony
    e.preventDefault();
    this.setState({
      names: [...this.state.names, this.refs.name.value]
    });
    //wyczyszczenie pola
    this.refs.form.reset();
  }

  populateArrays = () => {
    for (var i = 0; i < this.state.names.length; i++){
        this.state.debts.push([]);
        this.state.articles.push([]);
        for (var j = 0; j < this.state.names.length; j++){
            this.state.debts[i].push(0);
            this.state.articles[i].push([]);
        }
    }
}

  submitPurchase = (e) => {
    e.preventDefault();
    let kto = this.refs.kto.value,
        komu = this.refs.komu.value,
        ile = Number(this.refs.ile.value),
        co = this.refs.co.value;
    console.log(kto, komu, co, ile);
    this.increaseDebt(kto, komu, ile, co);    
    this.refs.increaseDebtForm.reset();
    this.showReport('on');
  }

  increaseDebt = (ktoKupil, komuKupil, howMuch, what = "") => {
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

showReport = (name) => {
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

showDetailedReport = (buyer, whoGotStuff = '') => {
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




  render() {
    return (
      <div className="App">
        <p>Podaj ilość uczestników: </p>
        <form onSubmit={this.submitParticipant} ref="form">
          <input type="text" ref="name" placeholder="Wprowadź nazwę uczestnika" />
          <button type="submit">Zatwierdz</button>
        </form> 
        
        <button onClick={this.populateArrays.bind(this)}>Skonczyłem dodawać</button>

        <p>Uczestnicy:</p>
        <ul>
          {this.state.names.map((name, i)=><li key={i}>{name}</li>)} 
        </ul>
        
        <form ref="increaseDebtForm" onSubmit={this.submitPurchase.bind(this)}>
          <p>Kto kupił?</p>
          <select ref="kto">
            {this.state.names.map((name, i) => <option key={i} value={name}>{name}</option>)}
          </select>
          <p>Komu kupił?</p>
          <select ref="komu">
            {this.state.names.map((name, i) => <option key={i} value={name}>{name}</option>)}
          </select>
          <p>Za ile?</p>
          <input type="number" ref="ile"/>
          <p>Co kupił?</p>
          <input type="text" ref="co" placeholder="Nazwa produktu..." />
          <button type="submit">Zatwierdź</button>
        </form>

        
      </div>  
    );
  }
}

export default App;
