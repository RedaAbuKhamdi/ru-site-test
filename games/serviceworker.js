/**
 * Created by Vladislav on 19.11.2024.
 */

self.addEventListener("push",  (event) => {
    const payload = event.data.json();

    console.log("push", payload);

    event.waitUntil(
        self.registration.showNotification(payload.title, {
            body: payload.message,
            image: payload.image,
            icon: payload.icon,
            badge: payload.badge,
            data: {
                url: payload.url
            }
        })
    );
});

self.addEventListener("notificationclick", (event) => {
    const url = event.notification.data.url;

    console.log("notificationclick", event.notification.data.url);

    event.waitUntil(
        (async () => {
            const allClients = await self.clients.matchAll({
                includeUncontrolled: true
            });

            let existingClient;

            for (const client of allClients) {
                const clientUrl = new URL(client.url);

                if (clientUrl.href.includes(url)) {
                    existingClient = client;
                    break;
                }
            }

            if (existingClient) {
                await existingClient.focus();
            } else {
                await self.clients.openWindow(url);
            }
        })()
    );
});