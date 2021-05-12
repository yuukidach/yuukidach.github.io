var curTime = new Date();
var startTime = new Date("2021/05/10 12:00:00")
var endTime = new Date("2021/05/15 16:00:00");
var timeDiff = endTime.getTime() - curTime.getTime()
if (timeDiff <= 0) {
    var percent = 100
} else {
    var percent = 100 - timeDiff / (endTime.getTime() - startTime.getTime()) * 100;
}

document.getElementsByClassName('progress-bar').item(0).setAttribute('aria-valuenow', percent.toFixed(2));
document.getElementsByClassName('progress-bar').item(0).setAttribute('style', 'width: '+percent.toFixed(2)+'%');
document.getElementById("prog_num").textContent = percent.toFixed(2)+"%"

window.onload = function () {
    bootlint.showLintReportForCurrentDocument([], {
        hasProblems: false,
        problemFree: false
    });

    $('[data-toggle="tooltip"]').tooltip();

    function formatDate(date) {
        return (
            date.getDate() +
            "/" +
            (date.getMonth() + 1) +
            "/" +
            date.getFullYear()
        );
    }

    var currentDate = formatDate(new Date());

    $(".due-date-button").datepicker({
        format: "dd/mm/yyyy",
        autoclose: true,
        todayHighlight: true,
        startDate: currentDate,
        orientation: "bottom right"
    });

    $(".due-date-button").on("click", function (event) {
        $(".due-date-button")
            .datepicker("show")
            .on("changeDate", function (dateChangeEvent) {
                $(".due-date-button").datepicker("hide");
                $(".due-date-label").text(formatDate(dateChangeEvent.date));
            });
    });
};
