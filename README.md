# SCOPE Simulator

**S.C.O.P.E.:** **S**imulation for **C**ognitive **O**bservation of **P**erception & **E**xperience

<img src="./scope/src/assets/target-window.png" alt="SCOPE Target Window" width="85%"/>

## 🌟 Project Overview

The SCOPE Simulator is an interactive, web-based tool designed to explore and test fundamental principles of User Experience (UX), particularly focusing on **user intuition, visual perception of layouts, and interaction patterns**.

Inspired by a desire to provide empirical, interactive insights to the UX community, SCOPE aims to create a dynamic environment where researchers, designers, and developers can observe and analyze how users interact with and interpret various interface challenges.

## 🎯 Vision & Purpose

In the realm of UX, understanding how layout, content density, and interactive elements influence user understanding is paramount. The SCOPE Simulator provides a unique platform to:

* **Empirically Test Intuition:** Move beyond theoretical discussions to directly observe user responses to UI patterns and questions.
* **Explore Readability Dynamics:** Dynamically adjust content layouts (e.g., line spacing, text density) to find optimal readability thresholds.
* **Study Interaction Patterns:** Present various UI challenges (like identifying save buttons or navigation elements) and observe user choices.
* **Facilitate Research:** Serve as an open-source tool for UX researchers to conduct studies on human perception and interaction design.
* **Educate & Inspire:** Offer a hands-on learning experience for aspiring and seasoned UX professionals.

## ✨ Features (Current & Planned)

* **Extensible Plugin System:** The simulator is built on a modular architecture where each interactive diagram is a self-contained plugin. This allows for the rapid development and integration of new test scenarios.
* **JSON-Based Question Configuration:** Test questions, diagrams, and contextual data are all defined in `public/questions.json`, making it simple to modify, add, or reorder test flows.
* **Abstract Design Philosophy:** Utilizes simplified, abstract shapes and layouts in its diagrams to isolate and test core UX principles without the distraction of realistic content.
* **Immersive Interface:** A full-screen, dark-themed UI minimizes distractions and focuses the user on the interactive challenge.
* **Future Roadmap:** Key planned enhancements include a results analytics dashboard and an AI-powered summary. For a complete overview of future features and project direction, please see the [`ROADMAP.md`](ROADMAP.md) file.

## 🚀 Getting Started

To get the SCOPE Simulator up and running on your local machine:

### Prerequisites

* Node.js (LTS version recommended)
* npm (Node Package Manager, usually comes with Node.js)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/scopecreepsoap/scope-simulator.git
    ```
2.  **Navigate into the project directory:**
    ```bash
    cd scope
    ```
3.  **Install dependencies:**
    ```bash
    npm install
    ```

### Running the Development Server

Start the local development server to view the application in your browser:

```bash
npm run dev
```

---

### 🙌 Credits

**SCOPE** was designed and developed by **Sriram Bhat** as part of an independent research effort to explore cognitive bias and interface perception in traffic operations.

This work was shaped by early research collaborations and insightful contributions from:

- **Gustavo Chavez** – initial white paper collaborator and co-lead on the internal research direction
- **Dr. Katelyn Fry-Hilderbrand** – for introducing the MATB-II framework and discussions on cognitive load
- **Dr. Gopika Ajaykumar** – for expert guidance in UX and cognitive load theory throughout development
- **David Garcia** – providing UI/UX feedback, testing, and level 3 question contributions
---

## 🤝 Contributing

Contributions are highly encouraged. The project's plugin architecture is designed to make it easy for developers to add new diagrams and test scenarios.

Before you begin, please review the detailed **[`CONTRIBUTING.md`](CONTRIBUTING.md)** file for guidelines on the development process, coding standards, and plugin structure. For specific instructions on how to structure question objects in the JSON file, see the **[`README.md` in the `public` directory](public/README.md)**.

---

### 📘 License

**SCOPE** is distributed under the [MIT License](LICENSE). Contributions welcome.

Designed to support open UX research and shared exploration within the design and HCI community.
