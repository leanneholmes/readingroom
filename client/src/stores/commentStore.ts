import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import { ChatComment } from "../models/comment";
import { makeAutoObservable, runInAction } from "mobx";
import { store } from "./store";

export default class CommentStore {
  comments: ChatComment[] = [];
  hubConnnection: HubConnection | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  createHubConnection = (bookClubId: string) => {
    if (store.bookClubStore.selectedBookClub) {
      this.hubConnnection = new HubConnectionBuilder()
        .withUrl("http://localhost:5000/chat?bookClubId=" + bookClubId, {
          accessTokenFactory: () => store.userStore.user?.token as string,
        })
        .withAutomaticReconnect()
        .configureLogging(LogLevel.Information)
        .build();

      this.hubConnnection
        .start()
        .catch((error) =>
          console.log("Error establishing connection: ", error)
        );

      this.hubConnnection.on("LoadComments", (comments: ChatComment[]) => {
        runInAction(() => {
          comments.forEach((comment) => {
            comment.createdAt = new Date(comment.createdAt + "Z");
          });
          this.comments = comments;
        });
      });

      this.hubConnnection.on("ReceiveComment", (comment: ChatComment) => {
        runInAction(() => {
          comment.createdAt = new Date(comment.createdAt);
          this.comments.unshift(comment);
        });
      });
    }
  };

  stopHubConnection = () => {
    this.hubConnnection
      ?.stop()
      .catch((error) => console.log("Error stopping connection: ", error));
  };

  clearComments = () => {
    this.comments = [];
    this.stopHubConnection();
  };

  addComment = async (values: { body: string; bookClubId?: string }) => {
    values.bookClubId = store.bookClubStore.selectedBookClub?.id;
    try {
      await this.hubConnnection?.invoke("SendComment", values);
    } catch (error) {
      console.log(error);
    }
  };
}
