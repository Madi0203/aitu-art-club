document.addEventListener("DOMContentLoaded", () => {

  /* =====================================================
     ================== PAGE FADE ANIMATION ==============
     ===================================================== */
  const fadeEl = document.querySelector(".fade-on-load");
  if (fadeEl) setTimeout(() => fadeEl.classList.add("ready"), 100);



  /* =====================================================
     =============== CONTACT FORM VALIDATION ==============
     ===================================================== */
  const $form = $("#joinForm");

  if ($form.length) {
    $form.on("submit", function (e) {
      e.preventDefault();

      const name  = $("#name").val().trim();
      const group = $("#group").val().trim();
      const email = $("#email").val().trim();
      const msg   = $("#message").val().trim();
      const $alert = $("#formAlert");

      if (!name || !group || !email || !msg) {
        $alert.text("Please fill all fields.").css("color", "red");
        return;
      }

      const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!validEmail) {
        $alert.text("Please enter a valid email address.").css("color", "red");
        return;
      }

      $alert.text("Thank you! Your application has been received.")
            .css("color", "limegreen");

      this.reset();
    });
  }



  /* =====================================================
     ===================== IMAGE MODAL ====================
     ===================================================== */
  const $images = $(".js-modal-img");

  if ($images.length) {
    $images.on("click", function () {
      const src = $(this).attr("src");
      const modal = document.getElementById("imgModal");

      if (modal) {
        $("#imgModal img").attr("src", src);
        new bootstrap.Modal(modal).show();
      } else {
        window.open(src, "_blank");
      }
    });
  }



  /* =====================================================
     ====================== CRUD TABLE ====================
     ===================================================== */

  let editRow = null;

  // Add new entry
  $(document).on("click", "#confirmAdd", function () {
    const name  = $("#addName").val().trim();
    const role  = $("#addRole").val().trim();
    const hours = $("#addHours").val().trim();

    if (!name || !role || !hours) {
      alert("Please fill all fields");
      return;
    }

    const newRow = `
      <tr>
        <td><strong>${name}</strong></td>
        <td>${role}</td>
        <td>${hours}</td>
        <td>
          <button class="btn btn-sm btn-warning editBtn">Edit</button>
          <button class="btn btn-sm btn-danger deleteBtn">Delete</button>
        </td>
      </tr>`;

    $("#crudTable tbody").append(newRow).hide().fadeIn(200);

    $("#addName, #addRole, #addHours").val("");
    $("#addModal").modal("hide");
  });


  // Delete row
  $(document).on("click", ".deleteBtn", function () {
    $(this).closest("tr").fadeOut(250, function () {
      $(this).remove();
    });
  });


  // Edit row (open modal)
  $(document).on("click", ".editBtn", function () {
    editRow = $(this).closest("tr");

    $("#editName").val(editRow.find("td:eq(0)").text());
    $("#editRole").val(editRow.find("td:eq(1)").text());
    $("#editHours").val(editRow.find("td:eq(2)").text());

    $("#editModal").modal("show");
  });


  // Save edited row
  $("#confirmEdit").click(function () {
    if (!editRow) return;

    editRow.find("td:eq(0)").html(`<strong>${$("#editName").val()}</strong>`);
    editRow.find("td:eq(1)").text($("#editRole").val());
    editRow.find("td:eq(2)").text($("#editHours").val());

    $("#editModal").modal("hide");
  });


  // CRUD search
  $(document).on("keyup", "#crudSearch", function () {
    const value = $(this).val().toLowerCase();
    $("#crudTable tbody tr").each(function () {
      $(this).toggle($(this).text().toLowerCase().includes(value));
    });
  });



  /* =====================================================
     ================== GALLERY FILTERING =================
     ===================================================== */

  function applyGalleryFilter(filter) {
    $(".gallery-item").each(function () {
      const category = ($(this).data("category") || "").toString().toLowerCase();

      if (filter === "all" || category === filter) {
        $(this).fadeIn(150);
      } else {
        $(this).fadeOut(150);
      }
    });
  }

  $(document).on("click", ".filter-btn", function () {
    const filter = $(this).data("filter");

    $(".filter-btn")
      .removeClass("btn-warning")
      .addClass("btn-outline-warning");

    $(this)
      .removeClass("btn-outline-warning")
      .addClass("btn-warning");

    applyGalleryFilter(filter);
  });



  /* =====================================================
     ================== GALLERY SEARCH ====================
     ===================================================== */

  $("#gallerySearch").on("keyup", function () {
    const value = $(this).val().toLowerCase();

    $(".gallery-item").each(function () {
      const imgAlt   = ($(this).find("img").attr("alt") || "").toLowerCase();
      const category = ($(this).data("category") || "").toString().toLowerCase();
      const text     = $(this).text().toLowerCase();

      const combined = imgAlt + " " + category + " " + text;

      $(this).toggle(combined.includes(value));
    });
  });



  /* =====================================================
     =================== WORKS SEARCH =====================
     ===================================================== */

  $("#workSearch").on("keyup", function () {
    const value = $(this).val().toLowerCase();

    $(".work-card").each(function () {
      const cardText = $(this).text().toLowerCase();
      $(this).closest(".col-md-4").toggle(cardText.includes(value));
    });
  });

});
