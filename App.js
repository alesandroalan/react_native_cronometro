import React, {Component} from 'react';
import {
 View,
 StyleSheet,
 Image,
 Text,
 TouchableOpacity,
} from 'react-native';

export default class cronometro extends Component{
 
  constructor(props){
    super(props);
    this.state = {t:0,bt_start:'Iniciar',status_cron:false,cron:null}
    this.cronManager = this.cronManager.bind(this);
    this.resetCron = this.resetCron.bind(this);
    this.updateCron = this.updateCron.bind(this);
  }

  updateCron(){
    let s = this.state;
    if(s.status_cron == true){
      s.t = s.t + 0.1;      
    }
    this.setState(s);
  }

  cronManager(){
    let s = this.state;
    let timer = null;
    //Se esta parado
    if(s.status_cron == false){
      s.status_cron = true;
      s.cron = setInterval(this.updateCron,100);
      s.bt_start = 'Parar';
    }else{ //se esta rodando
      s.status_cron = false;
      s.bt_start = 'Iniciar';
    }
    this.setState(s);
  }

  resetCron(){
    let s = this.state;
    clearInterval(s.cron);
    s.t = 0;
    s.bt_start = 'Iniciar';
    this.setState(s);
  }

  render(){
    return(
      <View style={styles.body}>
        <Image source={require('./images/relogio.png')}/>
        <Text style={styles.time}>{this.state.t.toFixed(1)}</Text>
        <View style={styles.bt_area}>
          <TouchableOpacity style={styles.bt} onPress={this.cronManager}>
            <Text style={styles.bt_text}>{this.state.bt_start}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bt} onPress={this.resetCron}>
            <Text style={styles.bt_text}>Limpar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  body:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#5c0d6f',
  },
  time:{
    fontSize:60,
    color:'#FFFFFF',
    fontWeight:'bold',
    marginTop:-140
  },
  bt_area:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    marginTop: 150
  },
  bt:{
    flex:1,
    margin:10,
    padding:10,
    backgroundColor:'white',
    borderRadius:5
  },
  bt_text:{
    fontSize:18,
    fontWeight:'bold',
    textAlign: 'center',
    color:'#5c0d6f'
  }
});