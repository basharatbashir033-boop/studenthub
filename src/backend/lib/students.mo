import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";
import Int "mo:core/Int";
import Order "mo:core/Order";
import AdminLib "admin";
import Types "../types/students";

module {
  public type StudentMap = Map.Map<Types.StudentId, Types.StudentRecord>;
  public type GpaHistoryMap = Map.Map<Types.StudentId, List.List<Types.GpaCalculation>>;

  // ── Grade conversion helpers ──────────────────────────────────────────────

  /// Convert marks (0–100) to a letter grade string.
  func marksToLetterGrade(marks : Nat) : Text {
    if (marks >= 90) "A+"
    else if (marks >= 85) "A"
    else if (marks >= 80) "A-"
    else if (marks >= 75) "B+"
    else if (marks >= 70) "B"
    else if (marks >= 65) "B-"
    else if (marks >= 60) "C+"
    else if (marks >= 55) "C"
    else if (marks >= 50) "C-"
    else if (marks >= 45) "D"
    else "F"
  };

  /// Convert marks (0–100) to grade points (4.0 scale).
  func marksToGradePoints(marks : Nat) : Float {
    if (marks >= 90) 4.0
    else if (marks >= 85) 4.0
    else if (marks >= 80) 3.7
    else if (marks >= 75) 3.3
    else if (marks >= 70) 3.0
    else if (marks >= 65) 2.7
    else if (marks >= 60) 2.3
    else if (marks >= 55) 2.0
    else if (marks >= 50) 1.7
    else if (marks >= 45) 1.0
    else 0.0
  };

  // ── Student registration / login ─────────────────────────────────────────

  /// Register a new student. Returns the student record or an error.
  public func registerStudent(
    studentMap : StudentMap,
    email : Text,
    password : Text,
  ) : { ok : ?Types.StudentRecord; err : ?Text } {
    // Validate inputs
    if (email.size() == 0) {
      return { ok = null; err = ?"Email cannot be empty" };
    };
    if (password.size() < 6) {
      return { ok = null; err = ?"Password must be at least 6 characters" };
    };
    // Check uniqueness
    if (studentMap.containsKey(email)) {
      return { ok = null; err = ?"An account with this email already exists" };
    };
    let hashed = AdminLib.hashPassword(password);
    let record : Types.StudentRecord = {
      id = email;
      email;
      hashedPassword = hashed;
      createdAt = Time.now();
    };
    studentMap.add(email, record);
    { ok = ?record; err = null }
  };

  /// Validate credentials and return the student record on success.
  public func loginStudent(
    studentMap : StudentMap,
    email : Text,
    password : Text,
  ) : { ok : ?Types.StudentRecord; err : ?Text } {
    switch (studentMap.get(email)) {
      case null { { ok = null; err = ?"No account found with this email" } };
      case (?record) {
        if (record.hashedPassword == AdminLib.hashPassword(password)) {
          { ok = ?record; err = null }
        } else {
          { ok = null; err = ?"Incorrect password" }
        }
      };
    }
  };

  // ── GPA history ───────────────────────────────────────────────────────────

  /// Save a new GPA calculation for the given user.
  public func saveGpaCalculation(
    gpaHistoryMap : GpaHistoryMap,
    nextId : Nat,
    userId : Types.StudentId,
    subjectInputs : [Types.GpaSubjectInput],
    calculatedGpa : Float,
    totalCredits : Nat,
  ) : Types.GpaCalculation {
    // Enrich inputs with computed grade fields
    let subjects : [Types.GpaSubject] = subjectInputs.map<Types.GpaSubjectInput, Types.GpaSubject>(
      func(s) {
        {
          subjectName = s.subjectName;
          marks = s.marks;
          credits = s.credits;
          gradePoints = marksToGradePoints(s.marks);
          letterGrade = marksToLetterGrade(s.marks);
        }
      }
    );
    let calc : Types.GpaCalculation = {
      id = nextId;
      userId;
      subjects;
      calculatedGpa;
      totalCredits;
      timestamp = Time.now();
    };
    let existing : List.List<Types.GpaCalculation> = switch (gpaHistoryMap.get(userId)) {
      case (?list) { list };
      case null { List.empty<Types.GpaCalculation>() };
    };
    existing.add(calc);
    gpaHistoryMap.add(userId, existing);
    calc
  };

  /// Retrieve the GPA history for a user, sorted newest-first, capped at 50.
  public func getUserGpaHistory(
    gpaHistoryMap : GpaHistoryMap,
    userId : Types.StudentId,
  ) : [Types.GpaCalculation] {
    switch (gpaHistoryMap.get(userId)) {
      case null { [] };
      case (?list) {
        let arr = list.toArray();
        // Sort descending by timestamp (newest first)
        let sorted = arr.sort(func(a : Types.GpaCalculation, b : Types.GpaCalculation) : Order.Order {
          Int.compare(b.timestamp, a.timestamp)
        });
        // Cap at 50
        if (sorted.size() > 50) {
          sorted.sliceToArray(0, 50)
        } else {
          sorted
        }
      };
    }
  };
};
