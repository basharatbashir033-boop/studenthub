import Common "common";

module {
  public type AnnouncementId = Common.AnnouncementId;
  public type Timestamp = Common.Timestamp;

  public type Announcement = {
    id : AnnouncementId;
    text : Text;
    active : Bool;
    createdAt : Timestamp;
  };

  public type AdSettings = {
    headerAdEnabled : Bool;
    sidebarAdEnabled : Bool;
    betweenCardsAdEnabled : Bool;
  };

  public type AdminCredentials = {
    email : Text;
    password : Text;
  };
};
