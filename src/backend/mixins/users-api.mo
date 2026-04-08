import Types "../types/users";
import UsersLib "../lib/users";

mixin (
  guests : UsersLib.GuestSet,
  principals : UsersLib.PrincipalSet,
) {

  // ── Visitor tracking — public ─────────────────────────────────────────────

  /// Register a guest visitor using a client-generated opaque id.
  public shared func trackGuestVisitor(guestId : Types.GuestId) : async () {
    ignore UsersLib.trackGuest(guests, guestId);
  };

  /// Register the authenticated caller as a visitor.
  public shared ({ caller }) func trackAuthenticatedVisitor() : async () {
    ignore UsersLib.trackPrincipal(principals, caller);
  };

  // ── Admin reads ───────────────────────────────────────────────────────────

  /// Returns total unique visitor count. Admin only.
  public shared ({ caller = _ }) func adminGetVisitorStats() : async Types.VisitorStats {
    { totalVisitors = UsersLib.totalVisitors(guests, principals) }
  };
};
