import { Dimensions, AsyncStorage } from 'react-native';
import { Notifications, Permissions } from 'expo';
import { CONSTANTS } from './enums';

export function getDailyReminderValue() {
  return {
    today: CONSTANTS.NOTIFICATION_BODY
  };
}

export function getWidth() {
  return Dimensions.get('window').width;
}

export function getHeight() {
  return Dimensions.get('window').height;
}

export function score(corrects, incorrects) {
  const ratio = corrects / (corrects + incorrects);
  return ratio * 100;
}
/**
 * Format date to YYYY-MM-DD , default : YYYY-MM-DD of today
 * @method getDateString
 * @param  {Array}      [args]  Date arguments with the samve overload.
 * @return {String}             YYYY-MM-DD
 */
export function getDateString(...args) {
  const date = new Date(...args);
  const todayUTC = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );
  return todayUTC.toISOString().split('T')[0];
}

export function isToday(yyyyMmDd) {
  return yyyyMmDd === getDateString();
}

function getNotificationTime(date) {
  date.setHours(CONSTANTS.NOTIFICATION_HOUR);
  date.setMinutes(CONSTANTS.NOTIFICATION_MINUTE);
  return date;
}

function tomorrowNotificationTime() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return getNotificationTime(tomorrow);
}

export function clearLocalNotification() {
  return AsyncStorage.removeItem(CONSTANTS.NOTIFICATION_KEY).then(
    Notifications.cancelAllScheduledNotificationsAsync
  );
}

function createNotification() {
  return {
    title: 'Refresh mind with Flashcards!',
    body: CONSTANTS.NOTIFICATION_BODY,
    ios: {
      sound: true
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true
    }
  };
}

export async function setLocalNotification(
  reject = (...args) => console.log(...args)
) {
  try {
    let data = await AsyncStorage.getItem(CONSTANTS.NOTIFICATION_KEY);
    data = JSON.parse(data);
    if (data === null) {
      try {
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS
        );
        if (status === 'granted') {
          Notifications.cancelAllScheduledNotificationsAsync();
          Notifications.scheduleLocalNotificationsAsync(createNotification(), {
            time: tomorrowNotificationTime(),
            repeat: 'day'
          });

          AsyncStorage.setItem(
            CONSTANTS.NOTIFICATION_KEY,
            JSON.stringify(true)
          );
        }
      } catch (errorPermissionNotification) {
        reject('Notification Permssion issue : ', errorPermissionNotification);
      }
    }
  } catch (e) {
    reject('AsyncStorage issue: ', e);
  }
}

// export function setLocalNotification() {
//   AsyncStorage.getItem(CONSTANTS.NOTIFICATION_KEY)
//     .then(JSON.parse)
//     .then(data => {
//       if (data === null) {
//         Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
//           if (status === 'granted') {
//             Notifications.cancelAllScheduledNotificationsAsync();
//             Notifications.scheduleLocalNotificationsAsync(
//               createNotification(),
//               {
//                 time: tomorrowNotificationTime(),
//                 repeat: 'day'
//               }
//             );
//
//             AsyncStorage.setItem(
//               CONSTANTS.NOTIFICATION_KEY,
//               JSON.stringify(true)
//             );
//           }
//         });
//       }
//     });
// }
