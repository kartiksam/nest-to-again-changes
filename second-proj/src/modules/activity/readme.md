# 📝 NestJS Activity Logger

This is a **NestJS-compatible activity logging service** that records user actions like `create`, `update`, and `delete` for any resource (e.g., post, user). It stores what changed, who did it, and when — making it ideal for **auditing**, **admin logs**, or **history tracking**.

---

## 🚀 Features

- Logs `create`, `update`, `delete`, and custom actions
- Stores resource name, user ID, and optional descriptions
- Captures full payload or `before/after` data for updates
- Uses MongoDB (Mongoose) and supports timestamps
- Easily injectable in any service

---

## 📁 File Structure

src/
└── modules/
└── activity/
├── activity.module.ts
├── activity.service.ts
└── schemas/
└── activity.schema.ts

## 🧱 How It Works

Each activity is saved as a MongoDB document with:

```ts
{
  userId: string;
  action: 'create' | 'update' | 'delete' | string;
  resource: string;
  description?: string;
  payload?: any; // before/after states, new object, deleted object
  createdAt: Date;
  updatedAt: Date;
}
```

```ts
//how to integrate
import { Module } from '@nestjs/common';
import { ActivityModule } from './modules/activity/activity.module';

@Module({
  imports: [ActivityModule],
})
export class AppModule {}


and import Activity module into that service where you want to use inthat module also
@Module({
  imports: [ActivityModule],
})
```

```ts
// Inject ActivityService where you want to log activity
import { ActivityService } from '../activity/activity.service'; // adjust path as

constructor(private readonly activityService: ActivityService) {}

// Log activity
    await this.activityService.logActivity({
      userId: userId,
      action: 'Create',
      resource: 'Post',
      description: 'Created a new post',
      payload: post,
    });




```
