# SCOPE Simulator

**S.C.O.P.E.:** **S**imulation for **C**ognitive **O**bservation of **P**erception & **E**xperience

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

### Current (Initial MVP Focus):
* Full-screen, immersive dark-themed interface.
* Core navigation elements (Previous/Next, Info, Exit).
* Central content area for interactive questions.
* Spacebar-triggered overlay menu for global navigation.
* **Dynamic Slider Interaction (Abstract):** A vertical "slider" component that visually manipulates the spacing/size of content blocks (abstract shapes or placeholder text initially) to simulate varying content density.

### Planned Enhancements:
* **Rich Content Manipulation:** Integrate real `Lorem ipsum` text with configurable font properties (size, line height, letter spacing) that dynamically adjust with the slider.
* **Diverse Scenario Types:** Implement multiple question types focusing on different UX challenges (e.g., finding specific UI elements, interpreting complex layouts).
* **Interactive Response Mechanisms:** Beyond the slider, introduce other interaction types (e.g., click targets, drag-and-drop elements for specific questions).
* **Research Data Collection (Opt-in):** Implement functionality to anonymously log user interactions (e.g., slider positions, time on task, selected answers) for research purposes (with clear user consent).
* **Custom Scenario Configuration:** Allow researchers to easily define and load their own test scenarios via JSON files.
* **Enhanced Animations & Transitions:** Polished visual feedback for interactions and navigation.
* **Accessibility:** Ensure keyboard navigation and screen reader compatibility.

## 🚀 Getting Started

To get the SCOPE Simulator up and running on your local machine:

### Prerequisites

* Node.js (LTS version recommended)
* npm (Node Package Manager, usually comes with Node.js)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/scope-simulator.git](https://github.com/your-username/scope-simulator.git)
    # (Replace your-username with your actual GitHub username when you create the repo)
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