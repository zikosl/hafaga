import React from 'react';
import Language from './language';
import translate from 'translate-google-api';

export default class LangProvider extends React.Component{
state = {
  information:{
    language:"fr",
    loginPage:[
      "Email",
      "Password",
      "Forget Password !?",
      "Connexion",
      "Vous n'avez pas de compte ? ",
      "S'inscrire",
    ],
    registerPage:[
      "surnom","Prénom","Email","Numero de Telephone","Mot de Pass","S'inscrire","Validez Numero",
      "Entrez Le numero que vous avez recu dans un message",
      "Vous avez  Une compte ? ",
      "S'identifier",
    ],
    profile:[
      "Profile","Mes commandes","La langue","Se déconnecter"
    ]
  },
}
componentDidMount()
{
  this.ready()
}
async ready()
{
    const {information} = this.state
    const a = await this.traduction(information.loginPage)
    information.loginPage=a
    const b = await this.traduction(information.registerPage)
    information.registerPage=b
    const c = await this.traduction(information.profile)
    information.profile=c
    this.setState({
        information:information
    })
}
async traduction(text)
{
    const a = await translate(text,{to:this.state.information.language})
    return a
}
toggle = async (data) => {
  const {information} = this.state
  information.language = data
  this.setState({information:information})
  await this.ready()
};
setLanguge=()=>{
  const {information} = this.state
  information.language = information.language == "ar" ? "fr" : "ar"
  this.setState({information:information})
}

get = (data) =>{
  return this.state.information.language
}
render(){
 return (
  <Language.Provider 
   value={{
    information: this.state.information,
    toggle: this.toggle,
    get: this.get,
    setLanguge: this.setLanguge
   }}
  >
   {this.props.children}
  </Language.Provider>
 );
 }
}