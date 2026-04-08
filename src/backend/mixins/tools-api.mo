import Types "../types/tools";
import ToolsLib "../lib/tools";

mixin (tools : ToolsLib.ToolMap) {

  // ── Public reads ──────────────────────────────────────────────────────────

  /// Returns only enabled tools. Safe to call without authentication.
  public query func getEnabledTools() : async [Types.Tool] {
    ToolsLib.listEnabled(tools)
  };

  // ── Usage tracking ────────────────────────────────────────────────────────

  /// Increments the usage counter for the given tool. Guest-callable.
  public shared func recordToolUsage(toolId : Types.ToolId) : async () {
    ToolsLib.incrementUsage(tools, toolId)
  };

  // ── Admin reads ───────────────────────────────────────────────────────────

  /// Returns all tools including disabled ones. Admin only.
  public shared ({ caller = _ }) func adminGetAllTools() : async [Types.Tool] {
    ToolsLib.listAll(tools)
  };

  /// Returns total and per-tool usage stats. Admin only.
  public shared ({ caller = _ }) func adminGetUsageStats() : async Types.ToolSummary {
    let stats = ToolsLib.usageStats(tools);
    let total = ToolsLib.totalUsage(tools);
    { toolId = "all"; totalUsage = total; perTool = stats }
  };

  // ── Admin mutations ───────────────────────────────────────────────────────

  /// Enable or disable a tool. Admin only.
  public shared ({ caller = _ }) func adminSetToolEnabled(toolId : Types.ToolId, enabled : Bool) : async Bool {
    switch (ToolsLib.get(tools, toolId)) {
      case (?_) {
        ToolsLib.setEnabled(tools, toolId, enabled);
        true
      };
      case null { false };
    }
  };
};
