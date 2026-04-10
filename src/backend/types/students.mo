import Common "common";

module {
  public type StudentId = Text; // email address

  public type HashedPassword = Text; // "hash:<nat>" format matching lib/admin.mo

  public type StudentRecord = {
    id : StudentId;
    email : Text;
    hashedPassword : HashedPassword;
    createdAt : Common.Timestamp;
  };

  public type GpaSubject = {
    subjectName : Text;
    marks : Nat;
    credits : Nat;
    gradePoints : Float;
    letterGrade : Text;
  };

  public type GpaCalculation = {
    id : Nat;
    userId : StudentId;
    subjects : [GpaSubject];
    calculatedGpa : Float;
    totalCredits : Nat;
    timestamp : Common.Timestamp;
  };

  public type GpaHistoryResult = {
    ok : ?[GpaCalculation];
    err : ?Text;
  };

  // API boundary input type (mirrors GpaSubject without computed fields)
  public type GpaSubjectInput = {
    subjectName : Text;
    marks : Nat;
    credits : Nat;
  };
};
