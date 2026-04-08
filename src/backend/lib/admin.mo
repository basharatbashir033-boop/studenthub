import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Nat8 "mo:core/Nat8";
import Blob "mo:core/Blob";
import Types "../types/admin";

module {
  public type AnnouncementMap = Map.Map<Types.AnnouncementId, Types.Announcement>;

  // ── Admin auth ────────────────────────────────────────────────────────────

  /// Validate email + password. Returns true when credentials match.
  public func validateCredentials(
    storedEmail : Text,
    storedPasswordHash : Text,
    email : Text,
    password : Text,
  ) : Bool {
    storedEmail == email and storedPasswordHash == hashPassword(password)
  };

  /// Hash a plaintext password (deterministic, simple hash for this use case).
  public func hashPassword(password : Text) : Text {
    // Use UTF-8 encoding and fold over bytes
    let bytes = password.encodeUtf8();
    let hash = bytes.toArray().foldLeft(
      5381,
      func(acc : Nat, b : Nat8) : Nat {
        (acc * 33 + b.toNat()) % 4294967296
      },
    );
    "hash:" # hash.toText()
  };

  // ── Announcements ─────────────────────────────────────────────────────────

  /// List all announcements (admin view — includes inactive).
  public func listAll(announcements : AnnouncementMap) : [Types.Announcement] {
    announcements.values().toArray();
  };

  /// List only active announcements (public view).
  public func listActive(announcements : AnnouncementMap) : [Types.Announcement] {
    announcements.values().filter(func(a : Types.Announcement) : Bool { a.active }).toArray();
  };

  /// Create a new announcement and insert it into the map.
  public func create(
    announcements : AnnouncementMap,
    nextId : Nat,
    text : Text,
    now : Types.Timestamp,
  ) : Types.Announcement {
    let announcement : Types.Announcement = {
      id = nextId;
      text;
      active = true;
      createdAt = now;
    };
    announcements.add(nextId, announcement);
    announcement
  };

  /// Update an existing announcement's text and/or active flag.
  public func update(
    announcements : AnnouncementMap,
    id : Types.AnnouncementId,
    text : Text,
    active : Bool,
  ) : Bool {
    switch (announcements.get(id)) {
      case (?ann) {
        announcements.add(id, { ann with text; active });
        true
      };
      case null { false };
    }
  };

  /// Delete an announcement. Returns true if it existed.
  public func delete(announcements : AnnouncementMap, id : Types.AnnouncementId) : Bool {
    switch (announcements.get(id)) {
      case (?_) {
        announcements.remove(id);
        true
      };
      case null { false };
    }
  };

  // ── Ad settings ───────────────────────────────────────────────────────────

  /// Build a new AdSettings record with the given flag changed.
  public func setAdFlag(
    current : Types.AdSettings,
    slot : { #header; #sidebar; #betweenCards },
    enabled : Bool,
  ) : Types.AdSettings {
    switch (slot) {
      case (#header) { { current with headerAdEnabled = enabled } };
      case (#sidebar) { { current with sidebarAdEnabled = enabled } };
      case (#betweenCards) { { current with betweenCardsAdEnabled = enabled } };
    }
  };
};
