/**
 * @format
 */

import 'react-native-gesture-handler';
import './utile/i18n';
import React from 'react';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import LoginProvider from './context/provider';
import LangProvider from './context/langprovider';
import PushNotification from "react-native-push-notification";
import Colors from "./palette"
import API, { URL } from "./api"
import LocationProvider from './context/locationprovider';
import palette from './palette';
import messaging from '@react-native-firebase/messaging';
import Traduction from './utile';

async function onMessageReceived(remoteMessage) {
	PushNotification.localNotification({
		autoCancel: true,
		subText: "ٌRead more",
		title: remoteMessage.data.title,
		message: remoteMessage.data.body,
		vibrate: true,
		vibration: 300,
		playSound: true
	})
}
async function onMessageR(remoteMessage) {
	PushNotification.localNotification({
		autoCancel: true,
		subText: "ٌvoir plus",
		title: remoteMessage.notification.title,
		message: remoteMessage.notification.body,
		vibrate: true,
		vibration: 300,
		playSound: true
	})
}

const Root = () => {

	return (
		<LangProvider>
			<LoginProvider>
				<LocationProvider>
					<App />
				</LocationProvider>
			</LoginProvider>
		</LangProvider>
	)
}
AppRegistry.registerComponent(appName, () => Root);