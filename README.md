# claire

_Top 10 Finalist at Hack the 6ix 2018_

Claire is an AI chatbot with a UX designed specifically for the less tech-savvy elderly population. It helps seniors to journal and self-reflect, both proven to have mental health benefits, through a simulated social experience. At the same time, it allows caregivers to stay up-to-date on the emotional wellbeing of the elderly. This is all done with natural language processing, used to identify the emotions associated with each conversation session.

## Technical Design

We used a React front-end served by a node.js back-end. Messages were sent to Google Cloud's natural language processing API, where we could identify emotions for recording and entities for enhancing the simulated conversation experience. Information on user activity and profiles are maintained in a Firebase database.

See more on [Devpost](https://devpost.com/software/claire-ai-chatbot-for-senior-citizens)
