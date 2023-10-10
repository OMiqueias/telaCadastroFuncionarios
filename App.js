import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, ScrollView, TouchableOpacity, Modal} from 'react-native';
import { TextInputMask } from 'react-native-masked-text'; // Importar TextInputMask

export default function App() {

  const [aviso, setAviso] = useState('');
  const [registro, setRegistro] = useState('');
  const [nome, setNome] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [cpf, setCpf] = useState('');
  const [setor, setSetor] = useState('');
  const [cargo, setCargo] = useState('');
  const [telefoneFixo, setTelefoneFixo] = useState('');
  const [telefoneFixoEmergencia, setTelefoneFixoEmergencia] = useState('');
  const [modalVisible, setModalVisible] = useState(false); //
  const [camposComErro, setCamposComErro] = useState([]); // Estado para rastrear o campo com erro
  //Mascaras:
  const [telefone, setTelefone] = useState(''); //Para mascara do telefone fixo
  const [celular, setCelular] = useState(''); //Para mascara do celular
  const [telefoneEmergencia, setTelefoneEmergencia] = useState(''); //Para mascara do telefone fixo para emergencia
  const [celularEmergencia, setCelularEmergencia] = useState(''); //Para mascara do celular para emergencia

  const handleCadastro = () => {
    const camposObrigatorios = [
      { campo: 'registro', valor: registro },
      { campo: 'nome', valor: nome },
      { campo: 'dataNascimento', valor: dataNascimento },
      { campo: 'cpf', valor: cpf },
      { campo: 'telefoneFixo', valor: telefoneFixo },
      { campo: 'setor', valor: setor },
      { campo: 'cargo', valor: cargo },
      { campo: 'telefoneFixoEmergencia', valor: telefoneFixoEmergencia },
    ];

    const camposComErroTemp = camposObrigatorios
      .filter((campo) => !campo.valor)
      .map((campo) => campo.campo);

    if (camposComErroTemp.length > 0) {
      setAviso('Por favor, preencha todos os campos obrigatórios.');
      setModalVisible(true);

      // Alteração nas linhas abaixo para definir campos com erro
      setCamposComErro(camposComErroTemp);
    } else {
      setAviso('');
      setModalVisible(false);

      // Limpar campos com erro quando o cadastro for bem-sucedido
      setCamposComErro([]);
    }
  };

  return (
    <ScrollView style={styles.ScrollView}>
    <View style={styles.container}>
      <StatusBar hidden />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{aviso}</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>VOLTAR</Text>
        </TouchableOpacity>
      </View>

        <Image
          source={require('./assets/Logo.png')}
          style={{ width: 200, height: 200 }} // Ajuste as dimensões conforme necessário
          marginTop="5%"
        />
    </View>

      <View style={styles.containerMeio}>
        <View style={styles.containerInterno}>

          <Text style={styles.subTitulosDivisao}>Informações Pessoais:</Text>
          <TextInput keyboardType="numeric" placeholder="Número de Registro."style={[styles.textInput, registro === '' && aviso !== '' && styles.requiredInput]} onChangeText={(text) => setRegistro(text)} value={registro}/>
          <TextInput placeholder="Nome completo."style={[styles.textInput, registro === '' && aviso !== '' && styles.requiredInput]} autoCorrect={false} onChangeText={(text) => setNome(text)} value={nome}/>

          <TextInputMask
          placeholder="CPF."
          keyboardType='numeric'
            type={'cpf'}
            options={{
              format:'999.999.999-99'
              
            }}
            style={[styles.textInput, registro === '' && aviso !== '' && styles.requiredInput]}
            onChangeText={(text) => setCpf(text)} value={cpf}
          
          />

          <TextInputMask
            type={'datetime'}
            options={{
              format: 'DD/MM/YYYY',
            }}
            placeholder="Data de nascimento."
            style={[styles.textInput, registro === '' && aviso !== '' && styles.requiredInput]}
            onChangeText={(text) => setDataNascimento(text)}
            value={dataNascimento}
          />

          <TextInputMask
          keyboardType='numeric'
            type={'custom'}
            options={{
              mask: '+99 (99) 9999-9999',
            }}
            placeholder="Telefone fixo com DDD."
            style={[styles.textInput, registro === '' && aviso !== '' && styles.requiredInput]}
            onChangeText={(text) => setTelefone(text)}
            value={telefone}
          />

          <TextInputMask
          keyboardType='numeric'
            type={'custom'}
            options={{
              mask: '+99 (99) 99999-9999',
            }}
            placeholder="Celular com DDD."
            style={styles.textInput}
            onChangeText={(text) => setCelular(text)}
            value={celular}
          />
          
          <TextInput keyboardType="email-address" placeholder="E-mail."style={styles.textInput} autoCapitalize="none" autoCorrect={false}/>

          <Text style={styles.subTitulosDivisao}>Informação de Ocupação:</Text>
          <TextInput placeholder="Setor."style={[styles.textInput, registro === '' && aviso !== '' && styles.requiredInput]} autoCorrect={false} onChangeText={(text) => setSetor(text)} value={setor}/>
          <TextInput placeholder="Cargo."style={[styles.textInput, registro === '' && aviso !== '' && styles.requiredInput]} autoCorrect={false} onChangeText={(text) => setCargo(text)} value={cargo}/>
          
          <Text style={styles.subTitulosDivisaoEmergencia}>Contato de Emergência:</Text>

          <TextInputMask
          keyboardType='numeric'
            type={'custom'}
            options={{
              mask: '+99 (99) 9999-9999',
            }}
            placeholder="Telefone fixo com DDD."
            style={[styles.textInput, registro === '' && aviso !== '' && styles.requiredInput]}
            onChangeText={(text) => setTelefoneEmergencia(text)}
            value={telefoneEmergencia}
          />

          <TextInputMask
          keyboardType='numeric'
            type={'custom'}
            options={{
              mask: '+99 (99) 99999-9999',
            }}
            placeholder="Celular com DDD."
            style={styles.textInput}
            onChangeText={(text) => setCelularEmergencia(text)}
            value={celularEmergencia}
          />

          <TextInput keyboardType="email-address" placeholder="E-mail."style={styles.textInput} autoCapitalize="none" autoCorrect={false}/>
        </View>

      </View>
      <View style={styles.container}>

        <View style={styles.buttonContainerEnviar}>

          <TouchableOpacity style={styles.buttonCad} onPress={handleCadastro}>
            <Text style={styles.buttonTextCad}>FINALIZAR CADASTRO</Text>
          </TouchableOpacity>

        </View>
      </View>
    </ScrollView>
  );
}

//Estilos

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#238dd1',
    alignItems: 'center',
    justifyContent: 'center',
  },

  containerMeio:{
    alignItems:"center",
    justifyContent:"center",
    marginTop:30,
    marginRight:10,
    marginLeft:10,
    borderTopLeftRadius:10,
    borderTopRightRadius:10,
    borderLeftWidth:2,
    borderRightWidth:2,
    borderTopWidth:2,
    borderColor:"gray",
  },
  
  containerInterno:{
    width:"100%",
    paddingTop:10,
    paddingBottom:10,
    paddingLeft:5,
    paddingRight:5,
  },

  textInput:{
    height:35,
    marginBottom:5,
    borderBottomWidth:1,
    fontSize:18,
    color:"#000000",
  },

  subTitulosDivisao:{
    backgroundColor:"#e3e3e3",
    paddingLeft:5,
    borderRadius:10,
    fontSize:20,
    color:"#5498ff",
    fontWeight:"bold",
  },
  
  subTitulosDivisaoEmergencia:{
    backgroundColor:"#e3e3e3",
    paddingLeft:5,
    borderRadius:10,
    fontSize:20,
    color:"#ff3333",
    fontWeight:"bold",
  },

  buttonContainer:{
    position: "absolute",
    top:10, // Ajuste a posição vertical do botão conforme necessário
    left:0, // Ajuste a posição horizontal do botão conforme necessário
  },

  button:{
    backgroundColor:"#48c5fa", // Cor do botão
    borderWidth:1,
    borderColor:"#e3e3e3",
    borderTopRightRadius:5,
    borderBottomRightRadius:5,
    padding:2,
  },

  buttonCad:{
    backgroundColor:"#48c5fa", // Cor do botão
    borderWidth:1,
    borderColor:"#e3e3e3",
    borderRadius:5,
    padding:2,
  },

  buttonText:{ //Para botão voltar
    color:"white",
    fontSize:15,
  },

  buttonContainerEnviar:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding:10,
  },

  buttonTextCad:{ //Para botão cadastro
    color:"white",
    fontSize:20,
  },
  containerAviso: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10, // Ajuste a posição conforme necessário
  },
  aviso: {
    color: 'red', // Cor do aviso
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#48c5fa',
    borderRadius: 5,
    padding: 10,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
  },
  // Estilos condicionais para campos obrigatórios
  requiredInput: {
    borderColor: 'red',
    borderWidth: 1,
  },
});
