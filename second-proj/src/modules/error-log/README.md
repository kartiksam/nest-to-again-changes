
## 🧠 Purpose

To provide a centralized and consistent way of capturing runtime exceptions throughout the application — whether they are user-facing or internal — and persist them for debugging, monitoring, or auditing purposes.

This helps:
- Track down issues quickly by analyzing logs.
- Monitor error frequency and trends.
- Debug unhandled or edge-case bugs.


## How to use it

-- Import error-log file in your system
-- Add ErrorLog Module to the Imports array of app.module.ts
-- Add this code to main.ts

<!-- const errorLogsService = app.get(ErrorLogService);
app.useGlobalFilters(new ErrorLogFilter(errorLogsService)); -->
  

## Dependencies
-- npm i @nestjs/mongoose mongoose
-- npm i class-validator class transformer

