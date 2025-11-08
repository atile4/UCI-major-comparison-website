const majors = [
  "Aerospace Engineering, B.S.",
  "African American Studies, B.A.",
  "Anthropology, B.A.",
  "Applied and Computational Mathematics, B.S.",
  "Applied Physics, B.S.",
  "Art History, B.A.",
  "Art, B.A.",
  "Asian American Studies, B.A.",
  "Biochemistry and Molecular Biology, B.S.",
  "Biological Sciences, B.S.",
  "Biology/Education, B.S.",
  "Biomedical Engineering, B.S.",
  "Biomedical Engineering: Premedical, B.S.",
  "Business Administration, B.A.",
  "Business Economics, B.A.",
  "Business Information Management, B.S.",
  "Chemical Engineering, B.S.",
  "Chemistry, B.S.",
  "Chicano/Latino Studies, B.A.",
  "Chinese Studies, B.A.",
  "Civil Engineering, B.S.",
  "Classics, B.A.",
  "Cognitive Sciences, B.S.",
  "Comparative Literature, B.A.",
  "Computer Engineering, B.S.",
  "Computer Science, B.S.",
  "Criminology, Law and Society, B.A.",
  "Dance, B.A.",
  "Data Science, B.S.",
  "Developmental and Cell Biology, B.S.",
  "Drama, B.A.",
  "Earth System Science, B.S.",
  "East Asian Cultures, B.A.",
  "Ecology and Evolutionary Biology, B.S.",
  "Economics, B.A.",
  "Education Sciences, B.A.",
  "Electrical Engineering, B.S.",
  "English, B.A.",
  "Environmental Engineering, B.S.",
  "European Studies, B.A.",
  "Exercise Sciences, B.S.",
  "Film and Media Studies, B.A.",
  "French, B.A.",
  "Game Design and Interactive Media, B.S.",
  "Gender and Sexuality Studies, B.A.",
  "Genetics, B.S.",
  "German Studies, B.A.",
  "Global Cultures, B.A.",
  "Global Middle East Studies, B.A.",
  "History, B.A.",
  "Informatics, B.S.",
  // "Information and Computer Science, B.S.",
  "International Studies, B.A.",
  "Japanese Language and Literature, B.A.",
  "Korean Literature and Culture, B.A.",
  "Language Science, B.A.",
  "Literary Journalism, B.A.",
  "Materials Science and Engineering, B.S.",
  "Mathematics, B.S.",
  "Mechanical Engineering, B.S.",
  "Microbiology and Immunology, B.S.",
  "Music, B.A.",
  "Neurobiology, B.S.",
  "Nursing Science, B.S.",
  "Pharmaceutical Sciences, B.S.",
  "Philosophy, B.A.",
  "Physics, B.S.",
  "Political Science, B.A.",
  "Psychological Science, B.A.",
  "Psychology, B.S.",
  "Public Health Policy, B.A.",
  "Public Health Sciences, B.S.",
  "Quantitative Economics, B.A.",
  "Religious Studies, B.A.",
  "Social Ecology, B.A.",
  "Social Policy and Public Service, B.A.",
  "Sociology, B.A.",
  "Software Engineering, B.S.",
  "Spanish, B.A.",
  "Urban Studies, B.A."
];

document.querySelectorAll(".dropdown-container").forEach(container => {
  const input = container.querySelector(".dropdown-input");
  const toggle = container.querySelector(".dropdown-toggle");
  const menu = container.querySelector(".dropdown-menu");

  function populateDropdown(list) {
    menu.innerHTML = "";
    list.forEach(item => {
      const div = document.createElement("div");
      div.className = "dropdown-item";
      div.textContent = item;
      div.onclick = () => {
        input.value = item;
        menu.style.display = "none";
      };
      menu.appendChild(div);
    });
  }

  function filterList() {
    const query = input.value.toLowerCase();
    const filtered = majors.filter(m => m.toLowerCase().includes(query));
    populateDropdown(filtered);
    menu.style.display = filtered.length ? "block" : "none";
  }

  input.addEventListener("input", filterList);

  toggle.addEventListener("click", () => {
    if (menu.style.display === "block") {
      menu.style.display = "none";
    } else {
      populateDropdown(majors);
      menu.style.display = "block";
    }
  });

  document.addEventListener("click", e => {
    if (!container.contains(e.target)) {
      menu.style.display = "none";
    }
  });
});

