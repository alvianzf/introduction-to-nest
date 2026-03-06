# Extra Lesson: Beyond API Documentation

As a Backend Developer, your job is not just to write code that computers understand, but to write "guides" that humans understand.

While **Swagger** and **Postman** are perfect for explaining _how to use an endpoint_, they don't explain _why_ we built it, _how_ the whole system works, or _what decisions_ we made along the way.

## The Documentation Hierarchy

In a professional engineering team, we use different "buckets" for different types of knowledge:

```mermaid
mindmap
  root((Engineering Docs))
    Public Facing
      Swagger/Postman UI
      API Developer Portal
    Internal Knowledge
      Confluence / Wiki
      Technical Design Docs
    Code Level
      README.md
      ADRs (Decision Records)
      Code Comments
```

---

## 🏛️ Confluence (The Company Library)

**Confluence** (made by Atlassian) is like a private Wikipedia for your company. It is where "Long-form Knowledge" lives.

- **What lives here:** Onboarding guides, holiday policies, high-level system diagrams, and project roadmaps.
- **Analogy:** If your API is a **Recipe**, Confluence is the **History of the Restaurant** and the **Employee Handbook**.
- **When to use it:** When you need to explain a complex business process (e.g., "How our payment refund logic works across 3 different departments").

---

## 📜 ADRs: Architecture Decision Records

Imagine you join a company and ask: _"Why are we using PostgreSQL instead of MongoDB?"_ Usually, the answer is lost in old Slack messages.

**ADRs** solve this. They are simple markdown files stored **inside your code repository** that record a specific technical choice at a specific point in time.

**A typical ADR looks like this:**

1. **Title:** Use PostgreSQL for Books Data.
2. **Context:** We need strong relationships and ACID compliance for inventory.
3. **Decision:** We will use PostgreSQL 15.
4. **Consequences:** We gain reliability but lose the flexible schema of a NoSQL DB.

---

## 🏠 README (The Welcome Mat)

Your `README.md` is the first thing a human sees when they open your project folder on GitHub.

- **Purpose:** It should tell them **How to Install**, **How to Run**, and **How to Contribute**.
- **Pro-tip:** If your README is good, a new developer should be able to run your app in under 5 minutes without asking you a single question.

---

## ⚖️ Comparison: Which one do I use?

| If you want to...              | Use...                  | Purpose                                     |
| ------------------------------ | ----------------------- | ------------------------------------------- |
| Explain a specific Endpoint    | **Swagger / Postman**   | For Frontend devs to integrate              |
| Explain a Company Process      | **Confluence / Notion** | For anyone in the company to read           |
| Record why you chose a library | **ADR**                 | For future developers to understand history |
| Show how to start the app      | **README.md**           | For developers to get up and running        |

## Summary

Don't just be a coder; be a **communicator**.

A developer who can write a clear technical design doc is often more valuable than a developer who can just write complex code. Documentation is how you scale your impact across a whole team!

---

## Author

**Alvian Zachry Faturrahman**

- Web: https://alvianzf.id
- LinkedIn: https://linkedin.com/in/alvianzf
