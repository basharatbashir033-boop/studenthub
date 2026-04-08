import Time "mo:core/Time";
import Types "../types/admin";
import AdminLib "../lib/admin";

mixin (
  announcements : AdminLib.AnnouncementMap,
) {

  var nextAnnouncementId : Nat = 1;
  var adSettings : Types.AdSettings = {
    headerAdEnabled = true;
    sidebarAdEnabled = true;
    betweenCardsAdEnabled = true;
  };
  var adminEmail : Text = "basharatbashir033@gmail.com";
  var adminPasswordHash : Text = AdminLib.hashPassword("admin123");

  // ── Auth ──────────────────────────────────────────────────────────────────

  /// Validate admin credentials. Returns true on success.
  public shared func adminLogin(email : Text, password : Text) : async Bool {
    AdminLib.validateCredentials(adminEmail, adminPasswordHash, email, password)
  };

  /// Change admin password. Requires current password for verification.
  public shared func adminChangePassword(currentPassword : Text, newPassword : Text) : async Bool {
    if (AdminLib.validateCredentials(adminEmail, adminPasswordHash, adminEmail, currentPassword)) {
      adminPasswordHash := AdminLib.hashPassword(newPassword);
      true
    } else {
      false
    }
  };

  // ── Announcements — public reads ──────────────────────────────────────────

  /// Returns only active announcements. Guest-callable.
  public query func getActiveAnnouncements() : async [Types.Announcement] {
    AdminLib.listActive(announcements)
  };

  // ── Announcements — admin mutations ──────────────────────────────────────

  /// Returns all announcements including inactive. Admin only (caller-based).
  public shared ({ caller = _ }) func adminListAnnouncements() : async [Types.Announcement] {
    AdminLib.listAll(announcements)
  };

  /// Create a new announcement. Admin only.
  public shared ({ caller = _ }) func adminCreateAnnouncement(text : Text) : async Types.Announcement {
    let ann = AdminLib.create(announcements, nextAnnouncementId, text, Time.now());
    nextAnnouncementId += 1;
    ann
  };

  /// Update an existing announcement. Admin only.
  public shared ({ caller = _ }) func adminUpdateAnnouncement(id : Nat, text : Text, active : Bool) : async Bool {
    AdminLib.update(announcements, id, text, active)
  };

  /// Delete an announcement. Admin only.
  public shared ({ caller = _ }) func adminDeleteAnnouncement(id : Nat) : async Bool {
    AdminLib.delete(announcements, id)
  };

  // ── Ad controls ───────────────────────────────────────────────────────────

  /// Returns current ad visibility settings. Guest-callable.
  public query func getAdSettings() : async Types.AdSettings {
    adSettings
  };

  /// Toggle header ad visibility. Admin only.
  public shared ({ caller = _ }) func adminSetHeaderAd(enabled : Bool) : async () {
    adSettings := AdminLib.setAdFlag(adSettings, #header, enabled);
  };

  /// Toggle sidebar ad visibility. Admin only.
  public shared ({ caller = _ }) func adminSetSidebarAd(enabled : Bool) : async () {
    adSettings := AdminLib.setAdFlag(adSettings, #sidebar, enabled);
  };

  /// Toggle between-cards ad visibility. Admin only.
  public shared ({ caller = _ }) func adminSetBetweenCardsAd(enabled : Bool) : async () {
    adSettings := AdminLib.setAdFlag(adSettings, #betweenCards, enabled);
  };
};
