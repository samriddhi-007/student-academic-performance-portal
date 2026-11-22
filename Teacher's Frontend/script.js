
let students = [
    // Second Year - Data Science - Section A
    { rollNumber: "201", name: "Student A", year: "Second Year", department: "Data Science", section: "Section A" },
    { rollNumber: "202", name: "Student B", year: "Second Year", department: "Data Science", section: "Section A" },
    { rollNumber: "203", name: "Student C", year: "Second Year", department: "Data Science", section: "Section A" },

    // Second Year - Data Science - Section B
    { rollNumber: "204", name: "Student D", year: "Second Year", department: "Data Science", section: "Section B" },
    { rollNumber: "205", name: "Student E", year: "Second Year", department: "Data Science", section: "Section B" },
    { rollNumber: "206", name: "Student F", year: "Second Year", department: "Data Science", section: "Section B" }
];
function updateSubjects() {

    let year = document.getElementById("collegeYear").value;
    let subject = document.getElementById("subject");

    subject.innerHTML = '<option value="">Select Subject</option>';

    let subjects = [];

    if (year === "First Year") {
        subjects = ["Subject A", "Subject B", "Subject C"];
    }
    else if (year === "Second Year") {
        subjects = ["Subject D", "Subject E", "Subject F"];
    }
    else if (year === "Third Year") {
        subjects = ["Subject G", "Subject H", "Subject I"];
    }
    else if (year === "Fourth Year") {
        subjects = ["Subject J", "Subject K", "Subject L"];
    }

    for (let i = 0; i < subjects.length; i++) {
        let option = document.createElement("option");

        option.text = subjects[i];
        option.value = subjects[i];

        subject.add(option);
    }
}
let isPublished = false;


function showStudents() {

    let year = document.getElementById("collegeYear").value;
    let department = document.getElementById("department").value;
    let section = document.getElementById("section").value;

    let subject = document.getElementById("subject").value;
    let assessment = document.getElementById("assessment").value;

    if (year === "" || department === "" ||
        section === "" || subject === "" || assessment === "") {

        alert("Please select all class details first.");
        return;
    }

    let filteredStudents = students.filter(function (student) {
        return student.year === year &&
            student.department === department &&
            student.section === section;
    });

    if (filteredStudents.length === 0) {
        alert("No students found for this selection.");
        document.getElementById("studentList").style.display = "none";
        return;
    }

    displayStudents(filteredStudents);

    document.getElementById("studentList").style.display = "block";
}
function displayStudents(filteredStudents) {

    let tableBody = document.querySelector("#studentList tbody");
    tableBody.innerHTML = "";

    // Create a row for every student
    for (let i = 0; i < filteredStudents.length; i++) {

        let student = filteredStudents[i];

        let row = document.createElement("tr");

        row.innerHTML = `
            <td>${student.rollNumber}</td>
            <td>${student.name}</td>
            <td>
                <input type="number" min="0" max="40" step="1" required>
            </td>
        `;

        tableBody.appendChild(row);
    }
}

function validateMarks() {
    let marks = document.querySelectorAll(
        "#studentList input[type='number']"
    );

    for (let i = 0; i < marks.length; i++) {
        let value = marks[i].value;

        if (value === "") {
            alert("Please enter marks for every student.");
            return false;
        }

        if (value < 0 || value > 40 ||
            !Number.isInteger(Number(value))) {
            alert("Marks must be whole numbers between 0 and 40.");
            return false;
        }
    }

    return true;
}

function saveDraft() {
    if (isPublished) {
        alert("Published marks cannot be edited.");
        return;
    }

    if (validateMarks()) {
        alert("Draft saved!");
    }
}

function publishMarks() {
    if (isPublished) {
        return;
    }

    if (validateMarks()) {
        isPublished = true;

        let marks = document.querySelectorAll(
            "#studentList input[type='number']"
        );

        for (let i = 0; i < marks.length; i++) {
            marks[i].disabled = true;
        }

        document.querySelectorAll(
            "#studentList button"
        ).forEach(function (button) {
            button.disabled = true;
        });

        alert("Marks published!");
    }
}
