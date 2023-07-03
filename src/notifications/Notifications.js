import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

var obj = {};

Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

  export async function schedulePushNotification(name, interval) {
    var notiName = name;
    name = null;
    obj[notiName] = await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Hej! '+ notiName + ' cos chce Ci powiedziec!🪴',
        body: 'Podalej mnie bo umrem',
        categoryIdentifier: 'plant',
      },
      trigger: {seconds: interval*60*60*24, repeats: true}
      
    });
    //await Notifications.cancelScheduledNotificationAsync(name);
    //await Notifications.cancelAllScheduledNotificationsAsync();
  }

  export async function cancelPushNotification(name){
    if(obj[name] != null){
    await Notifications.cancelScheduledNotificationAsync(obj[name]);
    }
    //await Notifications.cancelAllScheduledNotificationsAsync();
  }

  export async function cancelAllPushNotifications(){
    await Notifications.cancelAllScheduledNotificationsAsync();
  }

  export async function updatePushNotification(name, interval){
    if(obj[name] != null){
    await Notifications.cancelScheduledNotificationAsync(obj[name]);
    }
    await schedulePushNotification(name, interval);
  }
  
  async function registerForPushNotificationsAsync() {
    let token;
  
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    return token;
  }

  Notifications.setNotificationCategoryAsync('plant', [
    {
      actionId: 'one',
      buttonTitle: 'Podlano! 💦',
      isDestructive: false,
      isAuthenticationRequired: false,

    },

  ])
    .then(() => {
      console.log(`Category 'plant' created!`);
    })
    .catch(() => {
      console.log(`Category 'plant' not created!`);
    });
  