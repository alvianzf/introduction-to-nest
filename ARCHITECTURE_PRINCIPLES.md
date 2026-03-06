# Understanding Backend Architecture: OOP vs. SOLID

If you are transitioning into tech from a different career, understanding backend architecture can feel overwhelming. You might have heard terms like **OOP (Object-Oriented Programming)** and **SOLID principles**.

But which one should you focus on to understand why we build applications the way we do in **NestJS**?

## TL;DR

- **OOP (Object-Oriented Programming):** The building blocks (Classes, Objects, Methods) used to write your code physically.
- **SOLID (Single Responsibility Principle):** The reason _why_ we divide that code into separate files like Controllers, Services, and Repositories.
- **Clean Code:** The practice of making that code easy for other humans to read and understand later.

## The Short Answer

**You need both, but they serve different purposes.**

- **OOP** is the _toolbox_. It gives you the raw materials (Objects, Classes, Properties, Methods) to build your software.
- **SOLID** represents the _blueprints and best practices_. It tells you how to organize and assemble your raw materials so your house (application) doesn't collapse when you try to add a new room.

To understand _how_ NestJS works, you need **OOP**.
To understand _why_ NestJS is architected in layers (Controllers, Services, Repositories), you need **SOLID**.

---

## 1. Object-Oriented Programming (OOP)

In simple terms, OOP is a way of writing code where you group related data and actions together into "Objects" (created from "Classes").

### The 4 Pillars of OOP

To truly understand OOP, we need to look at its four main pillars. Let's use a popular monster-catching game to make sense of them.

#### A. Encapsulation (Protecting the Data)

Encapsulation means keeping data safe inside a class and only letting the outside world interact with it through specific methods. Think of a monster inside a capture ball. You can't reach inside and change its HP directly; you have to use an item like a Potion (a method) to heal it.

Similarly, in our `BooksRepository`, our `books` array is marked as `private`. This means a Controller can't just delete a book directly from the array. It _must_ call the `remove(id)` method. This prevents accidental data corruption.

#### B. Inheritance (Sharing Traits)

Inheritance allows a new class to take on the properties and methods of an existing class. An electric mouse and a fire lizard are both Monsters. They inherit basic stats (HP, Level) and actions (Attack, Faint) from a parent `Monster` class, but then add their own specific moves (Thunder Shock vs. Ember).

While we haven't used it heavily yet, if we had `AudioBooks` and `EBooks`, they could both inherit from a base `Book` class so we don't write the `title` and `author` properties twice.

#### C. Polymorphism (Many Forms)

Polymorphism means different classes can be treated as the same type if they share the same interface or base class, but they might behave differently. You can tell _any_ monster to "Attack", but the _way_ they attack depends on their specific type (Water Gun vs. Razor Leaf). The trainer just issues the "Attack" command.

In NestJS, if we swap our array-based `BooksRepository` for a `PostgresBooksRepository`, our `BooksService` can still just call `.findAll()`. It doesn't care _how_ the repository gets the books, as long as it returns an array of books.

#### D. Abstraction (Hiding Complexity)

Abstraction means hiding the complex reality while exposing only the necessary parts. When you tell your fire dragon to use Flamethrower, you don't need to know the biological mechanism of how it creates fire. You just press the 'A' button.

In our project, our `BooksController` calls `this.booksService.findAll()`. The controller doesn't need to know if the service is reading from a file, an array, or a database. It just presses the button and expects data back.

### Why is this important in NestJS?

NestJS is heavily built on OOP. When you look at your NestJS code, you will see `class BooksController`, `class BooksService`, and `class BooksRepository`.

Without understanding that a `class` is just a specialized Object holding private data (Encapsulation) and performing specific tasks (Abstraction), the structure of NestJS will feel confusing.

---

## 2. SOLID Principles

SOLID is an acronym for five design principles. You don't need to memorize all five right now. For understanding our basic backend architecture, the most important one is the **"S" - Single Responsibility Principle (SRP)**.

### Single Responsibility Principle (SRP)

_A class should have one, and only one, reason to change._

Imagine a restaurant.

- The **Host** takes your reservation and seats you.
- The **Chef** cooks the food.
- The **Waiter** brings the food to your table.

What if the Chef also had to take reservations and serve the food? They would be overwhelmed, mistakes would happen, and if the reservation system changed, the Chef would have to stop cooking to learn the new system.

### How this relates to our Layered Architecture

This is the exact reason we separate our application into layers. Let's look at our project:

1. **Controllers (`BooksController`):** Their _only_ responsibility is HTTP. They take the request, extract the ID or Body, give it to the Service, and return whatever the Service replies with.
2. **Services (`BooksService`):** Their _only_ responsibility is the "business logic". If we needed to check if a user had permission to create a book, or if a book's `pages` must be greater than 0, that logic goes here. It doesn't care if the request came from HTTP or a CLI.
3. **Repositories (`BooksRepository`):** Their _only_ responsibility is data access. It handles the `this.books.push()` or `this.books.findIndex()`.

**Why is it important?**
If tomorrow your boss says, "We are switching our database from an in-memory array to PostgreSQL", you _only_ need to update the `BooksRepository`. The `BooksController` and `BooksService` don't even know the database changed.

---

## 3. Clean Code

Clean Code is not a strict mathematical formula; it's a philosophy of writing code that is easy to read, understand, and maintain by _humans_.

A famous quote by Martin Fowler sums it up:

> _"Any fool can write code that a computer can understand. Good programmers write code that humans can understand."_

### What makes Code "Clean"?

1. **Meaningful Names:** Variables and functions should reveal their intent.
2. **Small Functions:** A function should do one thing, do it well, and do it only. (This is SRP applied at the function level).
3. **DRY (Don't Repeat Yourself):** If you are writing the same logic in three different places, extract it into a single reusable function or variable.

### Clean Code Examples in Our Project

- **Meaningful Names:** We named our function `findAll()` rather than `getEverything()`. We named our variable `booksMock` instead of `data`. It is immediately clear what they hold.
- **DRY Principle:** In our recent updates, we extracted the `Book` type into `src/types/book.type.ts`. If we hadn't done this, we would have had to type out `{id: string, title: string...}` inside the Repository, the Service, and the DTO. If we later added a `publisher` field, we'd have to update it in three places. By keeping it DRY, we only update it once.
- **Separating Mock Data:** We took our hardcoded array out of the `BooksRepository` and put it in `books.mock.ts`. This makes the Repository class shorter and easier to read, focusing purely on logic instead of holding 30 lines of fake data.

---

## Summary

- Learn the basics of **OOP (Classes, Objects, Methods)** to understand the physical building blocks of your NestJS code.
- Keep the **Single Responsibility Principle (from SOLID)** in the back of your mind to understand _why_ we divide that code into separate folders and files (Controllers vs. Services).
- Practice **Clean Code** so that when you or a teammate look at your code 6 months from now, it reads like plain English.

## Author

**Alvian Zachry Faturrahman**

- Web: https://alvianzf.id
- LinkedIn: https://linkedin.com/in/alvianzf
