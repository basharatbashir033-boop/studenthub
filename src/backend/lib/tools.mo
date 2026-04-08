import Map "mo:core/Map";
import Types "../types/tools";

module {
  public type ToolMap = Map.Map<Types.ToolId, Types.Tool>;

  /// Return all tools (admin view — includes disabled).
  public func listAll(tools : ToolMap) : [Types.Tool] {
    tools.values().toArray();
  };

  /// Return only enabled tools (public view).
  public func listEnabled(tools : ToolMap) : [Types.Tool] {
    tools.values().filter(func(t : Types.Tool) : Bool { t.enabled }).toArray();
  };

  /// Get a single tool by id.
  public func get(tools : ToolMap, id : Types.ToolId) : ?Types.Tool {
    tools.get(id);
  };

  /// Enable or disable a tool. No-op if tool not found.
  public func setEnabled(tools : ToolMap, id : Types.ToolId, enabled : Bool) {
    switch (tools.get(id)) {
      case (?tool) {
        tools.add(id, { tool with enabled });
      };
      case null {};
    };
  };

  /// Increment usage count for a tool. No-op if tool not found.
  public func incrementUsage(tools : ToolMap, id : Types.ToolId) {
    switch (tools.get(id)) {
      case (?tool) {
        tools.add(id, { tool with usageCount = tool.usageCount + 1 });
      };
      case null {};
    };
  };

  /// Return total usage count across all tools.
  public func totalUsage(tools : ToolMap) : Nat {
    tools.values().foldLeft(0, func(acc : Nat, t : Types.Tool) : Nat {
      acc + t.usageCount
    });
  };

  /// Return per-tool usage stats.
  public func usageStats(tools : ToolMap) : [Types.ToolStats] {
    tools.values().map<Types.Tool, Types.ToolStats>(func(t : Types.Tool) : Types.ToolStats {
      { toolId = t.id; usageCount = t.usageCount }
    }).toArray();
  };

  /// Seed the map with the default tool catalogue.
  public func seedDefaults(tools : ToolMap) {
    let defaults : [Types.Tool] = [
      {
        id = "gpa-calculator";
        name = "GPA Calculator";
        description = "Calculate your GPA by entering subjects, grades, and credit hours.";
        enabled = true;
        usageCount = 0;
      },
      {
        id = "percentage-calculator";
        name = "Percentage Calculator";
        description = "Instantly calculate percentages with a simple input form.";
        enabled = true;
        usageCount = 0;
      },
      {
        id = "pdf-tools";
        name = "PDF Tools";
        description = "Merge, convert, and manage PDF files with ease.";
        enabled = true;
        usageCount = 0;
      },
    ];
    for (tool in defaults.values()) {
      tools.add(tool.id, tool);
    };
  };
};
