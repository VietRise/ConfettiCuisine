$(document).ready(() => {
    // Listen for a click event on the modal button
    $("#modal-button").click(() => {
        // Clear the modal from any previous content
        $(".modal-body").html('');
        // Request data from 'courses?format=json' on asynchronously
        $.get("/courses?format=json", (data) => {
            data.forEach((course) => {
                $(".modal-body").append(
                    `<div>
                        <span class="course-title">
                            ${course.title}
                        </span>
                        <div class="course-description">
                            ${course.description}
                        </div>
                    </div>`
                );
            });
        });
    });

});