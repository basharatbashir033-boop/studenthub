import Common "common";

module {
  public type ToolId = Common.ToolId;

  public type Tool = {
    id : ToolId;
    name : Text;
    description : Text;
    enabled : Bool;
    usageCount : Nat;
  };

  public type ToolStats = {
    toolId : ToolId;
    usageCount : Nat;
  };

  public type ToolSummary = {
    toolId : ToolId;
    totalUsage : Nat;
    perTool : [ToolStats];
  };
};
