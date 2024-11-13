function toggleCheckboxes(selectAllCheckbox) {
  const checkboxes = document.querySelectorAll('.individual-checkbox');
  // console.log(checkboxes               );
  checkboxes.forEach((checkbox) => {
    checkbox.checked = selectAllCheckbox.checked;
    // console.log(checkbox.checked               );
    // console.log(selectAllCheckbox.checked               );

    // Crear un evento simulado para llamar a onCheckboxChange
    const event = new Event('change', { bubbles: true });
    // console.log(event               );
    checkbox.dispatchEvent(event);
  });
}
