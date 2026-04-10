import StudentsLib "../lib/students";
import Types "../types/students";

mixin (
  studentMap : StudentsLib.StudentMap,
  gpaHistoryMap : StudentsLib.GpaHistoryMap,
  nextGpaId : { var value : Nat },
) {

  // ── Student auth ──────────────────────────────────────────────────────────

  /// Register a new student account with email + password.
  public shared func registerStudent(
    email : Text,
    password : Text,
  ) : async { ok : ?Types.StudentRecord; err : ?Text } {
    StudentsLib.registerStudent(studentMap, email, password)
  };

  /// Login with email + password. Returns the student record on success.
  public shared func loginStudent(
    email : Text,
    password : Text,
  ) : async { ok : ?Types.StudentRecord; err : ?Text } {
    StudentsLib.loginStudent(studentMap, email, password)
  };

  // ── GPA history ───────────────────────────────────────────────────────────

  /// Save a GPA calculation and return the stored record.
  public shared func saveGpaCalculation(
    userId : Text,
    subjects : [Types.GpaSubjectInput],
    calculatedGpa : Float,
    totalCredits : Nat,
  ) : async Types.GpaCalculation {
    let id = nextGpaId.value;
    nextGpaId.value += 1;
    StudentsLib.saveGpaCalculation(gpaHistoryMap, id, userId, subjects, calculatedGpa, totalCredits)
  };

  /// Fetch a user's GPA calculation history (newest first, max 50).
  public shared func getUserGpaHistory(userId : Text) : async [Types.GpaCalculation] {
    StudentsLib.getUserGpaHistory(gpaHistoryMap, userId)
  };
};
