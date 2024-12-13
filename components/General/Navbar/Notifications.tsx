import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { TrashIcon } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useRouter } from "next/router";
import { BellIcon } from "lucide-react";
import { RotateCwIcon } from "lucide-react";
import { User } from "@/lib/ts/types/user";
import { NavigationMenuContent } from "@radix-ui/react-navigation-menu";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export enum EDropdown {
  notification = "notification",
  create = "create",
  help = "help",
  chrome = "chrome",
}

interface INotification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: string;
  category: string;
  icon: string;
  link: string;
  is_read: boolean;
  is_deleted: boolean;
  created_at: string;
  notification_id: number;
}

interface INotificationsResponse {
  notifications: INotification[];
  current_page: number;
  has_more: boolean;
  next_page: number;
  total_count: number;
}

interface INotificationProps {
  info: User;
  // show: boolean;
  // toggleDropDown: (type: EDropdown) => void;
  // isMobile?: boolean;
  token?: string;
  // transparentNav?: boolean;
}

const Notifications: React.FC<INotificationProps> = ({
  info,
  // show,
  // toggleDropDown,
  // isMobile,
  token = "",
  // transparentNav,
}) => {
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [notificationCount, setNotificationCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  // const handleClick = () => {
  //   setIsOpen(!isOpen);
  //   toggleDropDown(EDropdown.notification);
  // };

  // const handleClose = () => {
  //   setIsOpen(false);
  //   toggleDropDown(EDropdown.notification);
  // };

  const base = process.env.NEXT_PUBLIC_TEST_SERVER_URL;

  const getNotifications = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        base +
          `/api/notifications?page=${page}&page_size=5&user_id=${info._id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch notifications");
      }

      const data: INotificationsResponse = await response.json();

      setHasMore(data.has_more);
      // @ts-ignore
      setNotifications((prevNotifications) => {
        try {
          const updatedNotifications =
            page === 1
              ? data.notifications
              : [...prevNotifications, ...data.notifications];

          // Sort notifications by created_at in descending order
          const sortedNotifications = updatedNotifications?.sort(
            (a, b) =>
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
          );

          // Update the notification count
          setNotificationCount(sortedNotifications?.length);

          return sortedNotifications;
        } catch (error) {
          console.error("Error updating notifications:", error);
          return prevNotifications; // Return the previous state in case of an error
        }
      });
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  //  useEffect(() => {
  //    const interval = setInterval(() => {
  //      getNotifications();
  //    }, 60000); // Check for new notifications every 60 seconds

  //    return () => clearInterval(interval);
  //  }, []);

  useEffect(() => {
    getNotifications();
  }, [page]);

  const DeleteNotification = async (id: number) => {
    try {
      const response = await fetch(
        base + `/api/notifications?notification_id=${id}&user_id=${info._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete notification");
      }

      setNotifications((prevNotifications) =>
        prevNotifications.filter(
          (notification) => notification.notification_id !== id
        )
      );
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  async function MarkAsRead(id: number) {
    try {
      const response = await fetch(
        base +
          `/api/notifications/mark-as-read?notification_id=${id}&user_id=${info._id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to mark notification as read");
      }
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  }

  function HandleLoadMore() {
    setPage(page + 1);
  }

  function Refresh() {
    setNotifications([]);
    setHasMore(true);
    setPage(1);
    getNotifications();
  }

  if (!info) return null;

  return (
    <NavigationMenuContent
      style={{
        width: "300px",
        padding: "10px",
      }}
    >
      <div className=" mx-2 w-full inline-block text-left ">
        <div
          className=" w-full"
          // onMouseLeave={handleClose}
        >
          <div className="flex w-full justify-between">
            <h6 className=" text-black font-bold mb-2">
              {" "}
              Notifications ({notificationCount})
            </h6>
            <RotateCwIcon
              onClick={() => Refresh()}
              className="text-black cursor-pointer w-4  mr-3 top-2"
            />
          </div>
          {notifications?.length > 0 ? (
            notifications.map((notification, index) => (
              <>
                {/* @ts-ignore */}
                <NotificationCard
                  key={index}
                  index={index}
                  Notification={notification}
                  user_id={info._id}
                  markAsRead={MarkAsRead}
                  deleteNotification={DeleteNotification}
                />
              </>
            ))
          ) : (
            <h6>No notifications</h6>
          )}
          {hasMore && (
            <div
              onClick={() => HandleLoadMore()}
              className="text-center text-blue-500 cursor-pointer font-bold font-sans"
            >
              {loading ? "Loading..." : "Load More"}
            </div>
          )}
        </div>
      </div>
    </NavigationMenuContent>
  );
};

export default Notifications;

interface INotificationProps {
  Notification: INotification;
  index: number;
  user_id: string;
  deleteNotification: (id: number) => void;
  markAsRead: (id: number) => void;
}

export const NotificationCard: React.FC<INotificationProps> = ({
  Notification,
  index,
  user_id,
  deleteNotification,
  markAsRead,
}) => {
  const notificationDate = new Date(Notification.created_at);
  const displayDate = isNaN(notificationDate.getTime())
    ? new Date()
    : notificationDate;

  async function handleClick() {
    markAsRead(Notification.notification_id);
    window.open(Notification.link, "_blank");
  }

  return (
    <div
      style={{
        width: "300px",
        borderTop: index != 0 ? "1px solid #ccc" : "none",
      }}
      className={`p-1 px-2  border-gray-300 ${
        Notification.is_read ? "bg-gray-300" : "bg-white"
      } hover:bg-gray-300 transition-colors rounded-lg cursor-pointer duration-200`}
    >
      <div className="flex items-center justify-between">
        <div onClick={() => handleClick()} className="flex flex-col">
          <h6 className="font-medium text-black">{Notification.title}</h6>
          <h6 className=" text-[#5d5d5d] font-medium">
            {Notification.message}
          </h6>
          <h6 color="textSecondary">{formatDistanceToNow(displayDate)} ago</h6>
          {}
        </div>
        <div className="flex justify-end mt-2">
          <TrashIcon
            className="text-black"
            onClick={() => deleteNotification(Notification.notification_id)}
          />
        </div>
      </div>
    </div>
  );
};
