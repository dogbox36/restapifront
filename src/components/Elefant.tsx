import React, { Component } from 'react';
import './style.css';
interface elefant{
   elefantid: number;
   elefantname: string;
   elefantweight: number;
   elefantgender: string;
 }
 
 interface State{
   elefantok: elefant[]; 
   name: string;
   weight: number;
   gender: string;
 }
 
 interface ElefantAdatListResponse{
   elefant: elefant[];
 }
 export class Elefant extends Component<{}, State>{
   constructor(props: {}){
     super(props);
 
     this.state = {
       name: '',
       weight: 0,
       gender: '',
       elefantok: [],
     }
   }
 
   async loadElefantok() {
     let response = await fetch('http://localhost:3000/api/elefant');
     let data = await response.json() as elefant[];
     console.log(data);
     this.setState({
       elefantok: data, 
     })
   }
 
   componentDidMount() {
     this.loadElefantok();
   }

   async deleteelefant(id: number) {
    await fetch('http://localhost:3000/api/elefant/' + id, {
        method: 'DELETE',
        
    })
   }
    
   handleUpload = async () => {
     const { name, weight, gender, elefantok} = this.state;
     if(name.trim() === '' || weight<1){
       //this.setState(error)
       return;
     }
 
     const adat = {
       elefantname: name,
       elefantweight: weight,
       elefantgender: gender,
     };
 
     let response = await fetch('http://localhost:3000/api/elefant', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json'
       },
       body: JSON.stringify(adat),
     });
 
     this.setState({ 
       name: '',
       weight: 0,
       gender: '',
       elefantok: [],
     })
 
     await this.loadElefantok();
   };
   
   render(){
     const { name, weight, gender, elefantok} = this.state;
     return <div>
     <div className="sor"><h2>Új Elefant</h2></div>
     <div className="sor">Név: <input type='text' value={name} onChange={e => this.setState({ name: e.currentTarget.value})}></input><br/></div>
     <div className="sor">Súly: <input type='number' value={weight} onChange={e => this.setState({ weight: parseInt(e.currentTarget.value) })}></input> <br/></div>
     <div className="sor">Neme: <input type='text' value={gender} onChange={e => this.setState({ gender: e.currentTarget.value })}></input> <br/></div>
     <div className="sor"><button className='hozzad' onClick={this.handleUpload}>Hozzaad</button> <br /></div>
     <div className="sor"><h2>Elefantok:</h2></div>
     <ul>{
           this.state.elefantok.map(elefant => 
             <li>{elefant.elefantname}, {elefant.elefantweight}kg, {elefant.elefantgender}<button className="torles" onClick={() => this.deleteelefant(elefant.elefantid)}>Törlés</button></li>
             
             
           )
         }</ul>        
     </div>
   }
 }