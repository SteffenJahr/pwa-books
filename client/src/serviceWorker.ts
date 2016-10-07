self.addEventListener('push', function (event) {
    console.log('Push message received', event);

    event.waitUntil(
        self.registration.showNotification('Notification', {
            body: 'Notification received'
        }));
});
