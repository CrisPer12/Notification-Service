import { makeNotification } from "@test/factories/notification-factory";
import { InMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications-repository";
import { NotificationNotFound } from "./errors/notification-not-found";
import { ReadNotification } from "./read-notification";
import { UnreadNotification } from "./unread-notification";

describe('Unread Notification', () => {
    it('should be able to UnRead a notification', async () => {
        const notificationRepository = new InMemoryNotificationsRepository();
        const unReadNotification = new UnreadNotification(notificationRepository);

        const notification = makeNotification({
            readAt: new Date(),
        });

        await notificationRepository.create(notification);

        await unReadNotification.execute({
            notificationId: notification.id,
        })


        expect(notificationRepository.notifications[0].readAt).toBeNull()
    });

    it('should not be able to Unread a non exists notification', async () => {
        const notificationRepository = new InMemoryNotificationsRepository();
        const unReadNotification = new UnreadNotification(notificationRepository);

        expect(() => {
            return unReadNotification.execute({
                notificationId: 'fake-notification-id',
            })
        }).rejects.toThrow(NotificationNotFound)
    })
})