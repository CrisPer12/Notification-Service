import { makeNotification } from "@test/factories/notification-factory";
import { InMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications-repository";
import { CancelNotification } from "./cancel-notification";
import { NotificationNotFound } from "./errors/notification-not-found";

describe('Cancel Notification', () => {
    it('should be able to Cancel a notification', async () => {
        const notificationRepository = new InMemoryNotificationsRepository();
        const cancelNotification = new CancelNotification(notificationRepository);

        const notification = makeNotification();

        await notificationRepository.create(notification);

        await cancelNotification.execute({
            notificationId: notification.id,
        })


        expect(notificationRepository.notifications[0].canceledAt).toEqual
            (expect.any(Date))
    });

    it('should not be able to cancel a non exists notification', async () => {
        const notificationRepository = new InMemoryNotificationsRepository();
        const cancelNotification = new CancelNotification(notificationRepository);

        expect(() => {
            return cancelNotification.execute({
                notificationId: 'fake-notification-id',
            })
        }).rejects.toThrow(NotificationNotFound)
    })
})