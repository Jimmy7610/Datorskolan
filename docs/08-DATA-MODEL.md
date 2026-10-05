# Datamodell

## UserProfile

```json
{
  "id": "local-user",
  "displayName": "",
  "mode": "standard",
  "createdAt": "",
  "lastSeenAt": "",
  "settings": {
    "sound": true,
    "animations": true,
    "textScale": 1,
    "highContrast": false
  }
}
```

## SkillProgress

```json
{
  "skillId": "mouse.double-click",
  "status": "practicing",
  "attempts": 4,
  "successes": 3,
  "independentSuccesses": 1,
  "hintLevelMax": 2,
  "lastPracticedAt": "",
  "retentionChecks": 0,
  "masteryScore": 0.68
}
```

## LessonProgress

```json
{
  "lessonId": "mouse-003-double-click",
  "status": "in_progress",
  "currentStep": 4,
  "attempts": 1,
  "completedAt": null
}
```

## SessionEvent

```json
{
  "timestamp": "",
  "type": "exercise.success",
  "lessonId": "mouse-003-double-click",
  "skillId": "mouse.double-click",
  "metadata": {
    "hintLevel": 0,
    "durationMs": 4120
  }
}
```

## Storage

MVP:
- localStorage

Senare:
- IndexedDB vid behov,
- frivillig backend/synk i senare fas.

## Dataminimering

Spara inte mer personlig information än vad utbildningen behöver.
