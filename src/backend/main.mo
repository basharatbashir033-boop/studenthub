import Map "mo:core/Map";
import Set "mo:core/Set";
import AdminLib "lib/admin";
import UsersLib "lib/users";
import StudentsLib "lib/students";
import ToolsLib "lib/tools";
import ToolsApi "mixins/tools-api";
import AdminApi "mixins/admin-api";
import UsersApi "mixins/users-api";
import StudentsApi "mixins/students-api";

actor {
  // ── Tool registry ─────────────────────────────────────────────────────────
  let tools : ToolsLib.ToolMap = Map.empty();

  // ── Announcements ─────────────────────────────────────────────────────────
  let announcements : AdminLib.AnnouncementMap = Map.empty();

  // ── Visitor tracking ──────────────────────────────────────────────────────
  let guests : UsersLib.GuestSet = Set.empty();
  let principals : UsersLib.PrincipalSet = Set.empty();

  // ── Student accounts & GPA history ────────────────────────────────────────
  let studentMap : StudentsLib.StudentMap = Map.empty();
  let gpaHistoryMap : StudentsLib.GpaHistoryMap = Map.empty();
  var nextGpaIdValue : Nat = 0;
  let nextGpaId = { var value = nextGpaIdValue };

  // ── Seed default tools on first start ────────────────────────────────────
  do {
    ToolsLib.seedDefaults(tools);
  };

  // ── Mixin composition ─────────────────────────────────────────────────────
  include ToolsApi(tools);
  include AdminApi(announcements);
  include UsersApi(guests, principals);
  include StudentsApi(studentMap, gpaHistoryMap, nextGpaId);
};
