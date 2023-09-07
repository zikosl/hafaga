import React from "react"
import { StyleSheet, TextInput, View, Text, TouchableOpacity, Image, ScrollView } from "react-native"
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth'
import LoginContext from "../context/logincontext";
import { PhoneNumberUtil } from "google-libphonenumber";
import api from "../api";
import palette from "../palette";
const yellow = "#FAD103";

export default function AddPhone() {
	const Context = React.useContext(LoginContext);
	const [focus, setFocus] = React.useState(false)
	const [phone, setPhone] = React.useState(null)
	const [code, setcode] = React.useState(null)
	const [confirme, setConfirme] = React.useState(null)
	const [recived, setrecived] = React.useState(false)
	const [loading, setLoading] = React.useState(false)
	const [loading2, setLoading2] = React.useState(false)
	const phoneUtil = PhoneNumberUtil.getInstance();

	const navigation = useNavigation();
	const send = async () => {
		try {
			setLoading(true)
			const number = phoneUtil.parseAndKeepRawInput(phone, "DZ")
			const internationalNumber = phoneUtil.formatOutOfCountryCallingNumber(number);
			const confirmation = await auth()
				.verifyPhoneNumber(internationalNumber)
			setConfirme(confirmation)
			setrecived(true)
			setLoading(false)
		}
		catch (e) {
			setLoading(false)
			alert("le numero non valid")
		}
	}
	const activer = async () => {
		try {
			setLoading2(true)
			const credential = auth.PhoneAuthProvider.credential(
				confirme.verificationId,
				code
			)
			auth().signInWithCredential(credential).then(async () => {
				let number = phoneUtil.parseAndKeepRawInput(phone, "DZ")
				number = phoneUtil.format(number)
				number = number.replace(/[^\d]/g, '');
				await api.post('client/phone', {
					id: Context.login.uid,
					phone: number
				})
				setLoading(false)
				let data = Context.login;
				data.phone = number;
				Context.setInformation(data);
				navigation.goBack();
			})
		}
		catch (error) {
			setLoading2(false)
			if (error.code == 'auth/invalid-verification-code') {
				alert('Code No valid')
			}
			else {
				alert('utiliser un autre phone')
			}
			setrecived(false)
		}
	}
	return (
		<ScrollView style={{ flex: 1 }} contentContainerStyle={styles.container}>
			<View style={{ flex: 1 }}>
				<Image style={styles.img} source={require('../images/logo2.png')} />
				<View style={{ justifyContent: "center", flex: 1 }}>
					<View style={styles.flex}>
						<TextInput keyboardType="phone-pad" onChangeText={(g) => setPhone(g)} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} style={[styles.phone, focus && { borderColor: palette.secondary }]} />
						{
							recived ? (
								<TextInput keyboardType="numeric" onChangeText={(g) => setcode(g)} style={styles.code} />
							) : (
								<View style={{ marginVertical: 130 }}></View>
							)
						}
						{

							recived ? (
								<TouchableOpacity disabled={loading2} onPress={() => activer()} style={styles.btn}>
									{
										loading2 ? (
											<Image style={{ width: 140, height: 20, resizeMode: 'contain' }} source={require('../images/hafaga.gif')} />
										) : (
											<Text style={styles.btntext}>{">>"} continue l'achat</Text>
										)
									}
								</TouchableOpacity>
							) : (
								<TouchableOpacity disabled={loading} onPress={() => send()} style={styles.btn}>
									{
										loading ? (
											<Image style={{ width: 65, height: 20, resizeMode: 'contain' }} source={require('../images/hafaga.gif')} />
										) : (
											<Text style={styles.btntext}>send Code</Text>
										)
									}
								</TouchableOpacity>
							)
						}
					</View>
				</View>
			</View>
		</ScrollView>
	)
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		justifyContent: "center",
	},
	flex: {
		backgroundColor: "#fff",
		paddingVertical: 30,
		paddingHorizontal: 20
	},
	phone: {
		borderWidth: 1,
		borderRadius: 7,
		borderColor: "#ddd",
		textAlign: "center",
		fontFamily: "MavenPro-Medium",
		fontSize: 18,
	},
	code: {
		borderWidth: 1,
		borderRadius: 30,
		marginHorizontal: 60,
		borderColor: "#ddd",
		paddingHorizontal: 20,
		textAlign: "center",
		fontFamily: "MavenPro-Medium",
		fontSize: 18,
		marginVertical: 110
	},
	btntext: {
		fontFamily: "MontserratAlternates-Bold"
	},
	btn: {
		alignSelf: "center",
		justifyContent: "center",
		backgroundColor: palette.secondary,
		paddingHorizontal: 20,
		paddingVertical: 10,
		borderRadius: 20,
	},
	img: {
		resizeMode: "contain",
		alignSelf: "center",
		width: 220,
		height: 150,
	}
})