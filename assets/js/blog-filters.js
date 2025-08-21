// Devuelve los valores seleccionados de un NodeList de checkboxes
function getCheckedValues(checkboxes) {
  return Array.from(checkboxes)
    .filter((cb) => cb.checked)
    .map((cb) => cb.value);
}
// blog-filters.js
// Filtrado y paginación para la página principal del blog

document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("search-input");
  const osMultiselect = document.getElementById("os-multiselect");
  const osBtn = document.getElementById("os-btn");
  const osDropdown = document.getElementById("os-dropdown");
  const osCheckboxes = osDropdown.querySelectorAll(".filter-os");
  const levelMultiselect = document.getElementById("level-multiselect");
  const levelBtn = document.getElementById("level-btn");
  const levelDropdown = document.getElementById("level-dropdown");
  const levelCheckboxes = levelDropdown.querySelectorAll(".filter-level");
  const perPageSelect = document.getElementById("per-page-select");
  const articlesList = document.getElementById("articles-list");
  const cards = Array.from(articlesList.getElementsByClassName("card"));
  const prevBtn = document.getElementById("prev-page");
  const nextBtn = document.getElementById("next-page");
  const paginationInfo = document.getElementById("pagination-info");

  let currentPage = 1;
  let perPage = parseInt(perPageSelect.value);

  // Multiselect open/close logic
  function closeAllDropdowns(e) {
    if (!osMultiselect.contains(e.target))
      osMultiselect.classList.remove("open");
    if (!levelMultiselect.contains(e.target))
      levelMultiselect.classList.remove("open");
  }
  osBtn.addEventListener("click", function (e) {
    osMultiselect.classList.toggle("open");
    levelMultiselect.classList.remove("open");
  });
  levelBtn.addEventListener("click", function (e) {
    levelMultiselect.classList.toggle("open");
    osMultiselect.classList.remove("open");
  });
  document.addEventListener("click", closeAllDropdowns);

  function getMultiSelectValues(select) {
    return Array.from(select.selectedOptions).map((opt) => opt.value);
  }

  function getFilters() {
    const os = getCheckedValues(osCheckboxes);
    const level = getCheckedValues(levelCheckboxes);
    const search = searchInput.value.trim().toLowerCase();
    return { os, level, search };
  }

  function filterCards() {
    const { os, level, search } = getFilters();
    return cards.filter((card) => {
      const title = card.getAttribute("data-title").toLowerCase();
      const cardOs = card.getAttribute("data-os");
      const cardLevel = card.getAttribute("data-level");
      const matchTitle = !search || title.includes(search);
      const matchOs = os.length === 0 || os.includes(cardOs);
      const matchLevel = level.length === 0 || level.includes(cardLevel);
      return matchTitle && matchOs && matchLevel;
    });
  }

  function renderPage(page) {
    const filtered = filterCards();
    const total = filtered.length;
    const totalPages = Math.max(1, Math.ceil(total / perPage));
    currentPage = Math.max(1, Math.min(page, totalPages));
    // Hide all
    cards.forEach((card) => (card.style.display = "none"));
    // Show only filtered and paginated
    const start = (currentPage - 1) * perPage;
    const end = start + perPage;
    filtered.slice(start, end).forEach((card) => (card.style.display = "flex"));
    // Pagination info
    paginationInfo.textContent = `Página ${currentPage} de ${totalPages}`;
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
  }

  function updateBtnText(btn, checkboxes, label) {
    const checked = Array.from(checkboxes).filter((cb) => cb.checked).length;
    if (checked === 0) {
      btn.textContent = label;
    } else {
      btn.textContent = label + " (" + checked + ")";
    }
  }

  // Event listeners
  searchInput.addEventListener("input", () => renderPage(1));
  osCheckboxes.forEach((cb) =>
    cb.addEventListener("change", () => {
      updateBtnText(osBtn, osCheckboxes, "OS");
      renderPage(1);
    })
  );
  levelCheckboxes.forEach((cb) =>
    cb.addEventListener("change", () => {
      updateBtnText(levelBtn, levelCheckboxes, "Dificultad");
      renderPage(1);
    })
  );
  perPageSelect.addEventListener("change", function () {
    perPage = parseInt(this.value);
    renderPage(1);
  });
  prevBtn.addEventListener("click", () => renderPage(currentPage - 1));
  nextBtn.addEventListener("click", () => renderPage(currentPage + 1));

  // Inicializar
  updateBtnText(osBtn, osCheckboxes, "OS");
  updateBtnText(levelBtn, levelCheckboxes, "Dificultad");
  renderPage(1);
});
