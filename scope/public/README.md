# questions.json Guide

This file (`questions.json`) contains an array of all question objects for the SCOPE UX Simulator. This guide outlines the structure of these objects. For a complete guide on creating new diagram plugins, please refer to the main `CONTRIBUTING.md` file in the repository's root directory.

---

## Question Properties

Each question object in the JSON array can have the following properties:

* **`level`** (Number): The question's classification level. Level 3 questions have special requirements.
* **`prompt`** (String): The main text of the question displayed to the user.
* **`diagram`** (String[]): An array of one or more strings. Each string is a key that matches a diagram plugin's folder name. Using multiple keys will render several diagrams for one question.
* **`instruction`** (String, Optional): Additional instructional text displayed with the question.
* **`context`** (any[], Optional): For Level 3 questions, this property is **required** and holds custom data passed directly to the diagram component. The data structure is flexible to suit the specific needs of the custom diagram.
* **`canary`** (boolean, Optional): Marks the question as a canary (a control question used for data validation).
* **`canaryIntent`** (String, Optional): If a question is a canary, this property is **required**. It specifies the expected user interaction that the diagram's `canaryCheck` function will validate against.

---
