import Set "mo:core/Set";
import Types "../types/users";

module {
  public type GuestSet = Set.Set<Types.GuestId>;
  public type PrincipalSet = Set.Set<Principal>;

  /// Register a guest visitor by opaque id. Returns true if newly added.
  public func trackGuest(guests : GuestSet, guestId : Types.GuestId) : Bool {
    if (guests.contains(guestId)) {
      false
    } else {
      guests.add(guestId);
      true
    }
  };

  /// Register an authenticated principal. Returns true if newly added.
  public func trackPrincipal(principals : PrincipalSet, p : Principal) : Bool {
    if (principals.contains(p)) {
      false
    } else {
      principals.add(p);
      true
    }
  };

  /// Total unique visitor count (guests + principals).
  public func totalVisitors(guests : GuestSet, principals : PrincipalSet) : Nat {
    guests.size() + principals.size()
  };
};
